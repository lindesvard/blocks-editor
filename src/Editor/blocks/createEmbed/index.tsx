import React, { memo } from "react";
import { LinkSimple } from "phosphor-react";
import { BlockOptions, BlockOptionsIn, BlockProps } from "../../types";
import Block from "../../ui/Block";
import { Input } from "Editor/ui/Input";
import { Row } from "Editor/ui/Structure";
import { getTweetId, getYoutubeId, validLink } from "./utils";
import { isSoundcould, isTwitter, isYoutube } from "./source";

import { TwitterTweetEmbed } from "react-twitter-embed";
import SoundCloudEmbed from "react-soundcloud-embedded";
import YouTubeEmbed from "react-youtube-embed";

const ID = "embed";

export function createEmbed(options?: BlockOptionsIn): BlockOptions {
  function BlockComponent({ onUpdate, data, contentId }: BlockProps) {
    const isValidLink = validLink(data);

    function renderEmbed(url: string) {
      switch (true) {
        case isSoundcould(url):
          return (
            <SoundCloudEmbed
              url={url}
              showComments={false}
              hideRelated={true}
              height={"200px"}
            />
          );
        case isTwitter(url): {
          const id = getTweetId(url);
          return <TwitterTweetEmbed key={id} tweetId={id} />;
        }
        case isYoutube(url): {
          return <YouTubeEmbed id={url} />;
        }
      }
    }

    return (
      <Block title="Embed" padding={20}>
        <Row>
          <Input
            type="text"
            placeholder="Paste a link to see the preview"
            value={data}
            onChange={(event) => onUpdate(contentId, event.target.value)}
            style={{ flex: 1, marginBottom: data ? 20 : 0 }}
          />
        </Row>
        {isValidLink && renderEmbed(data)}
      </Block>
    );
  }

  return {
    id: ID,
    name: "Embed",
    button: {
      label: options?.button?.label ?? "Add embed",
      Icon: options?.button?.Icon ?? LinkSimple,
    },
    Block: memo(BlockComponent),
    initialData: "",
  };
}
