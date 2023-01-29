import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import React from "react";

interface ListItemProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

const ListItem = React.forwardRef(
  ({ className, children, title, ...props }: ListItemProps, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className="py-2 px-3 outline-none select-none font-medium text-base text-amber-600 block text-base no-underline rounded hover:bg-amber-100"
          {...props}
          ref={forwardedRef}
        >
          <div className="ListItemHeading mb-1 text-amber-800 text-base">
            {title}
          </div>
          <p className="ListItemTex text-baset">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

ListItem.displayName = "ListItem";
export default ListItem;
