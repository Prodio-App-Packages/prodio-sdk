import { FlowBannerStep, init } from "@insihts/workflow/core";

const position =
  (new URLSearchParams(window.location.search).get("position") as
    | FlowBannerStep["bannerPosition"]
    | undefined) ?? undefined;

init({
  flows: [
    {
      id: "flow",
      start: { location: "/" },
      steps: [
        {
          type: "banner",
          bannerPosition: position,
          title: "Hello",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
    },
  ],
});
