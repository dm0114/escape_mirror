import * as React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CommunityScreen from "../screens/CommunityScreen";




const renderScene = SceneMap({
  Cafe: CafeRoute,
  Theme: ThemeRoute
});

const CafeRoute = () => (
  <CafeListScroll
    data={data.storeList}
    ListHeaderComponent={<SubText>카페 검색 결과</SubText>}
    renderItem={({ item }) => (
      <SearchCafeList
        storeId={item.storeId}
        storeName={item.storeName}
        storeImg={item.storeImg}
        storeAddress={item.storeAddress}
        likeCount={item.likeCount}
      />
    )}
  />
);

const ThemeRoute = () => (
  <ThemeListScroll
    data={data.themeList}
    ListHeaderComponent={<SubText>테마 검색 결과</SubText>}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingTop: 30 }}
    renderItem={({ item }) => (
      <SearchThemeList
        themeId={item.themeId}
        themeName={item.themeName}
        storeName={item.storeName}
        themeImg={item.themeImg}
        likeCount={item.likeCount}
        star={item.star}
      />
    )}
  />
);


  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "Cafe", title: "카페 검색 결과"},
    { key: "Theme", title: "테마 검색 결과"},
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        Cafe: CafeRoute,
        Theme: ThemeRoute
      })}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      // renderTabBar={props => <TabBar {...props} />}
    />
  );
