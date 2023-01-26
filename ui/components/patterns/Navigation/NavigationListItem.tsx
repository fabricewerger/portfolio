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
          className="py-2 px-3 outline-none select-none font-medium text-base text-amber-600 block text-base no-underline"
          {...props}
          ref={forwardedRef}
        >
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

ListItem.displayName = "ListItem";
export default ListItem;
