import { protectedRoutes } from "@/src/constant";
import { MdOutlineVerifiedUser, MdVerified } from "react-icons/md";
import { useUser } from "@/src/context/user.provider";
import { useGetAuthUser } from "@/src/hooks/user.hook";
import { logOut } from "@/src/services/AuthService";
import { Avatar, Badge, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"; // Import Badge component
import { usePathname, useRouter } from "next/navigation";

export default function NavbarDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: userLoading } = useUser();
  const { data: authUser } = useGetAuthUser();

  const handleLogout = () => {
    logOut();
    userLoading(true);

    if (protectedRoutes.some((route: any) => pathname.match(route))) {
      router.push("/");
    }
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex items-center cursor-pointer relative">
        {authUser?.data?.isPremium && (
            <MdVerified className="text-2xl bg-white rounded-full top-0 absolute text-blue-500 z-20 right-6 " />
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
