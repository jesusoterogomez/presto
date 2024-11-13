import React, { useEffect, useState, useRef } from 'react';
import Select, { components } from 'react-select';
import { videoSearch, YoutubeSearchResultItem } from '../../api/youtube';
import { decodeHTMLEntities } from '../../utils/html';
import FeatherIcon from 'feather-icons-react';
import './SearchBar.less';

type Props = {
  onChange: (videoUrl: string) => void;
};

const DEBOUNCE_TIME = 1500; // Debounce time in milliseconds

const SearchBar = (props: Props): JSX.Element => {
  let ref: any;
  const [openMenuOnFocusFix, setOpenMenuOnFocusFix] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([] as YoutubeSearchResultItem[]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // Reference for the debounce timeout

  useEffect(() => {
    const updateVideos = async () => {
      // Write at least 3 characters to search videos
      if (searchTerm.length < 2) {
        return;
      }

      const items = await videoSearch(searchTerm);

      setVideos(items);
    };

    updateVideos();
  }, [searchTerm]);

  const handleChange = (updatedTerm: string) => {
    // Clear any existing timeout to reset debounce
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to delay setting the search term by 3 seconds
    debounceTimeout.current = setTimeout(() => {
      setSearchTerm(updatedTerm);
    }, DEBOUNCE_TIME);
  };

  const handleSelectVideo = (videoId: string) => {
    props.onChange(`https://www.youtube.com/watch?v=${videoId}`);
  };

  const formatOptions = (options: YoutubeSearchResultItem[] = []) => {
    return options.map((option) => ({
      item: option,
      value: option.id.videoId,
      label: option.snippet.title,
    }));
  };

  const options = formatOptions(videos);
  return (
    <Select
      ref={(node) => (ref = node)}
      components={{ Option, DropdownIndicator, Control }}
      inputValue={searchTerm}
      autoFocus={true}
      options={options}
      openMenuOnFocus={openMenuOnFocusFix}
      blurInputOnSelect={true}
      onInputChange={handleChange}
      placeholder="Type to search"
      isClearable={true}
      onChange={(item) => (item ? handleSelectVideo(item.value) : null)}
      backspaceRemovesValue={true}
      openMenuOnClick={false}
      classNamePrefix="searchbar"
      reset={async () => {
        const _ref = ref;
        ref.select.clearValue();
        ref.select.blur();
        ref.select.focus();

        /**
         * To re-focus the input after the search term is cleared, we need
         * to do some serious black magic. 🧙‍♂️
         *
         * react-select has an issue (https://github.com/JedWatson/react-select/issues/3832)
         * where the caret of the search input doesn't show after re-focusing the input programatically (via `focus()`)
         *
         * The github issue above explains that setting openMenuOnFocus to {true} fixes this issue, but this is
         * not the UX we're looking for. So I came up with a solution that's invisible to the end user.
         *
         * In 2 execution cycles (milliseconds), we toggle openMenuOnFocus to true, then false, which
         * sets focus back into the input element of the react-select control.
         *
         * In the 3rd millisecond, we focus the select element again to place the cursor back on the input
         *
         * (All of this happens too quick for the end user to see, and is TERRIBLE code, but works like a charm)
         */

        setTimeout(() => {
          _ref.select.blur();

          setOpenMenuOnFocusFix(true);
          _ref.select.focus();
        }, 1);

        setTimeout(() => {
          _ref.select.blur();
          setOpenMenuOnFocusFix(false);
        }, 2);

        setTimeout(() => {
          _ref.select.focus();
        }, 3);

        setVideos([]);
      }}
    />
  );
};

// Good: Custom component declared outside of the Select scope
const Control = (props: any) => {
  const { children, ...rest } = props;
  // console.warn(rest);
  if (rest.hasValue) {
    const [value] = rest.getValue();
    return (
      <components.Control {...rest} className="ControlVideoSelected">
        <div className="VideoSelectedInfo">
          <img src={value.item.snippet.thumbnails.default.url} alt="" />
          <p>{value.item.snippet.title}</p>
        </div>
        <button
          className="ControlVideoSelectedCancel"
          onClick={() => rest.selectProps.reset()}
        >
          Change&nbsp;
          <FeatherIcon icon="rotate-ccw" size="12" stroke="#FFF" />
        </button>
      </components.Control>
    );
  }

  return <components.Control {...rest}>{children}</components.Control>;
};

const DropdownIndicator = (props: any) => {
  const { ...rest } = props;

  if (rest.hasValue) {
    return null;
  }

  return (
    <components.DropdownIndicator className="DropdownIndicator" {...rest}>
      <FeatherIcon icon="search" size="24" stroke="#777" />
    </components.DropdownIndicator>
  );
};

type CustomOptionProps = {
  children: JSX.Element;
  data: {
    item: YoutubeSearchResultItem;
    value: string;
    label: string;
  };
};

const Option = (props: any) => {
  const {
    className,
    cx,
    data,
    getStyles,
    isDisabled,
    isFocused,
    isSelected,
    innerRef,
    innerProps,
  } = props;
  return (
    <div
      ref={innerRef}
      css={getStyles('option', props)}
      className={cx(
        {
          SelectOption: true,
          SelectOptionDisabled: isDisabled,
          SelectOptionFocused: isFocused,
          SelectOptionSelected: isSelected,
        },
        className
      )}
      {...innerProps}
    >
      <div className="thumbnail">
        <img src={data.item.snippet.thumbnails.medium.url} width="100" />
      </div>
      <div className="information">
        <div className="title">
          <h4>{decodeHTMLEntities(data.item.snippet.title)}</h4>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
