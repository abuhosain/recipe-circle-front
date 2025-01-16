import { MdVerified } from "react-icons/md";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"; // Import Badge component
import { usePathname, useRouter } from "next/navigation";

import { protectedRoutes } from "@/src/constant";
import { useUser } from "@/src/context/user.provider";
import { useGetAuthUser } from "@/src/hooks/user.hook";
import { logOut } from "@/src/services/AuthService";

export default function NavbarDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: userLoading } = useUser();
  const { data: authUser } = useGetAuthUser();

  const handleLogout = () => {
    logOut();
    userLoading(true);
    router.push("/login");
    
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex items-center  cursor-pointer relative">
          {authUser?.data?.isPremium && (
            <MdVerified className="text-lg bg-white rounded-full top-0 absolute text-blue-500 z-20  " />
          )}
          <Avatar src={user?.profilePicture} />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleNavigation(`/${user?.role}`)}>
          Dashboard
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/profile/settings")}>
          Settings
        </DropdownItem>

        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={() => handleLogout()}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
