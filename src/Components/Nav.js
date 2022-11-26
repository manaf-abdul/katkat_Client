import React, { useEffect, useState } from "react";
import "../style/Nav.css";
import { Menu } from 'antd'
import UserLogo from '../assets/user.webp'
import { Link, useNavigate } from "react-router-dom";
import { AppstoreAddOutlined, CoffeeOutlined, LogoutOutlined, UserAddOutlined } from "@ant-design/icons";
import { UserState } from "../Context";
import { toast } from "react-toastify";
import Search from "antd/es/input/Search";

const { Item, SubMenu, ItemGroup } = Menu //Menu.Item

const Nav = () => {
  const navigate=useNavigate()
  const { user, setUser } = UserState()
  const [show, handleShow] = useState();
  const [current, setCurrent] = useState('')
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      // window.removeEventListener("scroll");
    };
  }, []);

  const logout = async () => {
    try {
      localStorage.removeItem('userInfo')
      setUser(null)
    } catch (error) {
      toast(error.message)
    }
  }

  const onSearch = async () => {
    try {
      toast("Search COmpleted")
    } catch (error) {
      toast(error.message)
    }
  }

  return (
    <Menu mode='horizontal' selectedKeys={[current]}  style={{backgroundColor:!show ? "transparent" : "black",color:"white"}} className={`nav ${show && "nav_black"}`}>
      <Item
      
      onClick={()=>navigate('/')}
        key="/instructor"
        icon={<AppstoreAddOutlined  style={{ fontSize: '1.5rem' }}/>}
      >
      </Item>

      <Search style={{ color: "white", padding: 0, margin: 0, width: 200,marginTop:9 }} placeholder="input search text" onSearch={onSearch} enterButton />

      <SubMenu
        icon={<CoffeeOutlined style={{ fontSize: '1.5rem' }}/>}
        title={user ? user.username : "Profile"}
        className="float-right"
        style={{ position: "absolute", right: "0rem"}}
      >
        <ItemGroup className='float-right'>
          <Item
            key="/user"
            icon={<UserAddOutlined />}
          >
            Profile
          </Item>
          <Item
            onClick={logout}
            icon={<LogoutOutlined />}
            style={{ "float": "end" }}
          >
            Logout
          </Item>
        </ItemGroup>
      </SubMenu>

    </Menu>
  );
};

export default Nav;
