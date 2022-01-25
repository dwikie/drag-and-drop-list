import { Tabs, Tab, styled } from "@mui/material";
import * as React from "react";

const TabSection = styled(Tab)`
  text-transform: none;
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
`;

const TabWrapper = styled(Tabs)`
  position: relative;
  ::after {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.palette.grey["200"]};
  }
`;

export default function EventTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleTabClick = (e: React.SyntheticEvent) => {
    const parent = e.currentTarget.parentElement;
    const tabList = parent?.querySelectorAll("button.MuiTab-root");
    if (tabList) {
      const currentIndex = Array.from(tabList).indexOf(e.currentTarget);
      setActiveTab(currentIndex);
    }
  };

  return (
    <TabWrapper
      value={activeTab}
      aria-label="basic tabs example"
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile>
      <TabSection
        label="Curricullum"
        id="curricullum"
        aria-controls="panel-curricullum"
        onClick={handleTabClick}
      />
    </TabWrapper>
  );
}
