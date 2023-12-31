import React, { Fragment, memo, useState } from "react";
import avatar from "assets/defaultava.png";
import { memberSidebar } from "ultils/constant";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { FaAngleDoubleDown, FaAngleDoubleRight } from "react-icons/fa";
import { BsArrowLeftShort } from "react-icons/bs";
import path from "ultils/path";
import { BiSolidLogOut } from "react-icons/bi";
const activedStyle = "px-4 py-2 flex items-center gap-2 bg-blue-500";
const notactivedStyle = "px-4 py-2 flex items-center gap-2 hover:bg-blue-200";

const Membersidebar = ({ open, setOpen }) => {
  const [actived, setActived] = useState([]);
  const { current } = useSelector((state) => state.user);
  // Check mảng nếu không có id trong mảng thì copy lại mảng và push id mới vào
  // Nếu đã có id thì lọc ra những id có trong mảng mà không phải id vừa chọn
  // Nhầm làm các tab trở nên riêng biệt với nhau (đóng tab này thì tab khác vẫn mở bth)
  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === tabID)) {
      setActived((prev) => prev.filter((el) => el !== tabID));
    } else {
      setActived((prev) => [...prev, tabID]);
    }
  };
  console.log(current.role);
  return (
    <div
      className={`bg-dark-purple h-full py-4 ${
        open ? "w-72" : "w-20"
      } duration-700`}
    >
      <div className="w-full flex flex-col items-center justify-center py-4 text-white ">
        <img
          src={current?.avatar || avatar}
          alt="logo"
          className={`${
            open ? "w-16 h-16" : "w-10 h-10"
          } object-cover duration-500`}
        />
        <small
          className={`duration-500 font-bold ${!open && "scale-0"}`}
        >{`${current?.lastname} ${current?.firstname}`}</small>
      </div>
      <BsArrowLeftShort
        onClick={() => setOpen(!open)}
        className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3.5 top-9 border border-dark-purple cursor-pointer ${
          !open && "rotate-180"
        } `}
      />
      <div className="mt-10 ml-3 mr-5">
        {memberSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && el.id > 1 && +current.role === 1 ? (
              <span></span>
            ) : (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  clsx(
                    isActive && activedStyle,
                    !isActive && notactivedStyle,
                    "my-2"
                  )
                }
              >
                <span className="text-white">{el.icon}</span>
                <span
                  className={`text-white duration-200 ${!open && "hidden"}`}
                >
                  {el.text}
                </span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <div
                onClick={() => handleShowTabs(+el.id)}
                className="flex flex-col"
              >
                <div className="flex items-center justify-between px-4 py-2 hover:bg-blue-200 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="text-white">{el.icon}</span>
                    <span
                      className={`text-white duration-200 ${!open && "hidden"}`}
                    >
                      {el.text}
                    </span>
                  </div>
                  {actived.some((id) => id === el.id) ? (
                    <FaAngleDoubleRight
                      className={`text-white ${!open && "hidden"}`}
                    />
                  ) : (
                    <FaAngleDoubleDown
                      className={`text-white ${!open && "hidden"}`}
                    />
                  )}
                </div>
                {actived.some((id) => +id === +el.id) && (
                  <div
                    className={`flex flex-col text-white ${!open && "hidden"}`}
                  >
                    {el.submenu.map((item) => (
                      <NavLink
                        key={el.text}
                        to={item.path}
                        onClick={(e) => e.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activedStyle,
                            !isActive && notactivedStyle,
                            "pl-10 my-2"
                          )
                        }
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
        <div className="h-[40px] hover:bg-blue-200 items-center justify-center">
          <Link to={path.PUBLIC}>
            <div className=" flex ml-4 items-center">
              <span className="text-white mt-2">
                <BiSolidLogOut />
              </span>
              <span
                className={`text-white duration-200 pl-2 mt-2 ${
                  !open && "hidden"
                }`}
              >
                Back To Home Page
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(Membersidebar);
