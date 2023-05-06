import React, { useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Menu,
  Link,
  MenuButton,
  MenuList,
  Grid,
  GridItem,
  Image,
  Input,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import Router, { useRouter } from "next/router";
import { meContext } from "../../../hooks/me";

function NavItem({ title, description, active, changeSidebarMode }) {
  return (
    <Flex mt={30} flexDir="column" w="100%">
      <Menu placement="right">
        <Link
          backgroundColor={active && "#D6D5FF"}
          p={3}
          borderRadius={8}
          _hover={{
            textDecor: "none",
            backgroundColor: "#D6D5FF",
            color: "#773DCB",
          }}
          w="100%">
          <MenuButton
            w="100%"
            onClick={(e) => {
              changeSidebarMode(title.mode);
            }}>
            <Flex>
              <Text color={active && "#773DCB"} ml={5}>
                {title.value}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}

export default function edit() {
  const router = useRouter();
  const { id } = router.query;
  const { meState } = useContext(meContext);

  //URLで編集ページに入ってきた時にページを遷移させる
  // TODO: 遷移先のページを再検討
  if (meState.uid != id) {
    //Router.push("/");
  }

  const [sidebarMode, changeSidebarMode] = useState("profile");

  return (
    <Grid templateColumns="repeat(6, 1fr)">
      <GridItem colSpan={1} textAlign="center" bgColor="#FFFFFF" height="96vh">
        <NavItem
          // TODO:hooksでオブジェクト管理しても良いかも
          title={{ mode: "profile", value: "プロフィール" }}
          active={sidebarMode == "profile"}
          changeSidebarMode={changeSidebarMode}
        />
        <NavItem
          title={{ mode: "account", value: "アカウント" }}
          active={sidebarMode == "account"}
          changeSidebarMode={changeSidebarMode}
        />
      </GridItem>
      <GridItem colSpan={5} bgColor="#F9F9FA">
        <Image src={meState.photoURL} borderRadius="full" />
        <Text>お名前</Text>
        <Input bgColor="#FFFFFFF" />
        <Button
          bgGradient="linear-gradient(180deg, #5B59C1 0%, #8133CF 100%)"
          color="#FFFFFF">
          保存する
        </Button>
      </GridItem>
    </Grid>
  );
}
