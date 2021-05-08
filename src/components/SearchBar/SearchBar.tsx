import React, { useEffect, useRef, useState } from 'react';

import Select from 'react-select';
import { videoSearch, YoutubeSearchResultItem } from '../../api/youtube';
import styled from '@emotion/styled';

const StyledSearch = styled(Select)`
  .select__menu-list::-webkit-scrollbar {
    width: 4px;
    height: 0px;
  }
  .select__menu-list::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .select__menu-list::-webkit-scrollbar-thumb {
    background: #888;
  }
  .select__menu-list::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

type State = {
  inputValue: string;
};

const SearchBar: () => JSX.Element = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([] as YoutubeSearchResultItem[]);

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

    console.log('videos are:', videos);
  }, [searchTerm]);

  const handleChange = (updatedTerm: string) => {
    setSearchTerm(updatedTerm);
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
    <StyledSearch
      components={{ Option }}
      inputValue={searchTerm}
      options={options}
      onInputChange={handleChange}
      placeholder="Search..."
      isClearable={true}
      openMenuOnClick={false}
      classNamePrefix="select"
    />
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
  // const { children, data } = props as CustomOptionProps;
  const {
    children,
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
          <h4>{data.item.snippet.title}</h4>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
