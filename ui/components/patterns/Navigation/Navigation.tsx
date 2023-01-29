/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";

import ListItem from "./NavigationListItem";

const NavigationMenuDemo = () => {
  return (
    <NavigationMenu.Root className="relative flex justify-center z-[1] w-full m-2">
      <NavigationMenu.List className="flex justify-center bg-white p-1 border-lg rounded-lg list-none shadow m-0">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="py-2 px-3 outline-none select-none font-medium text-base text-amber-600 flex justify-center rounded justify-between gap-0.5 hover:bg-amber-100">
            Learn{" "}
            <CaretDownIcon className="CaretDown relative top-1" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-0 left-0 w-full shadow">
            <ul className="List grid p-[22px] gap-2 list-none w-[500px] one">
              <ListItem href="https://stitches.dev/" title="Stitches">
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
              <ListItem href="/colors" title="Colors">
                Beautiful, thought-out palettes with auto dark mode.
              </ListItem>
              <ListItem href="https://icons.radix-ui.com/" title="Icons">
                A crisp set of 15x15 icons, balanced and consistent.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="py-2 px-3 outline-none select-none font-medium text-base text-amber-600 flex justify-center rounded justify-between gap-0.5 hover:bg-amber-100">
            Overview{" "}
            <CaretDownIcon className="CaretDown relative top-1" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List w-[600px] grid-cols-1 two">
              <ListItem
                title="Introduction"
                href="/docs/primitives/overview/introduction"
              >
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Getting started"
                href="/docs/primitives/overview/getting-started"
              >
                A quick tutorial to get you up and running with Radix
                Primitives.
              </ListItem>
              <ListItem
                title="Styling"
                href="/docs/primitives/overview/styling"
              >
                Unstyled and compatible with any styling solution.
              </ListItem>
              <ListItem
                title="Animation"
                href="/docs/primitives/overview/animation"
              >
                Use CSS keyframes or any animation library of your choice.
              </ListItem>
              <ListItem
                title="Accessibility"
                href="/docs/primitives/overview/accessibility"
              >
                Tested in a range of browsers and assistive technologies.
              </ListItem>
              <ListItem
                title="Releases"
                href="/docs/primitives/overview/releases"
              >
                Radix Primitives releases and their changelogs.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link
            className="py-2 px-3 outline-none select-none font-medium text-base text-amber-600 flex justify-center justify-between gap-0.5 rounded hover:bg-amber-100"
            href="https://github.com/radix-ui"
          >
            Github
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="flex items-end justify-center">
          <div className="Arrow relative top-3/4 bg-white w-2 h-2 rotate-45" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition absolute flex justify-center w-full top-full left-0">
        <NavigationMenu.Viewport className="NavigationMenuViewport relative mt-2 bg-white rounded" />
      </div>
    </NavigationMenu.Root>
  );
};

export default NavigationMenuDemo;
