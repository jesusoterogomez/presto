import React from 'react';
import './Background.less';
import YouTube, { Options } from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';

interface Props {
  url: string;
}

const Background: ({ url }: Props) => JSX.Element = ({
  url,
}: Props): JSX.Element => {
  const isVideo = (url: string): boolean => url.includes('youtube');

  const prepareVideo = (videoUrl: string): JSX.Element => {
    const regex = /v=([\w-]+)?/gm;
    let matches: RegExpExecArray | null;
    if ((matches = regex.exec(videoUrl)) !== null) {
      const options: Options = {
        height: '100%',
        width: '100%',
        playerVars: {
          controls: 0,
          disablekb: 1,
          fs: 0,
          showinfo: 0,
          autoplay: 1,
          loop: 1,
        },
      };
      return (
        <YouTube
          videoId={matches[1]}
          opts={options}
          onReady={onVideoReady}
          className={'Video'}
        />
      );
    }
    return <span />;
  };

  const onVideoReady = ({ target }: { target: YouTubePlayer }) => {
    target.setVolume(20);
    target.playVideo();
  };

  return (
    <div className={'Background'} data-testid="Background">
      <div className={'Curtain'} />
      {isVideo(url) ? (
        prepareVideo(url)
      ) : (
        <div className={'Image'} style={{ backgroundImage: `url('${url}')` }} />
      )}
    </div>
  );
};

export default Background;
