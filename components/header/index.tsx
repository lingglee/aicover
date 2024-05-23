import { AppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Nav } from "@/types/nav";
import Social from "@/components/social";
import User from "@/components/user";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // 仍然使用 next/navigation

export default function Header() {
  const { user } = useContext(AppContext);
  const [selectedTab, setSelectedTab] = useState("");

  const navigations: Nav[] = [
    { name: "listen", title: "Listening", url: "/listen", target: "_self" },
    { name: "speak", title: "Speaking", url: "/speak", target: "_self" },
    { name: "read", title: "Reading", url: "/read", target: "_self" },
    { name: "write", title: "Writing", url: "/write", target: "_self" },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      setSelectedTab(pathname);
    }
  }, []);

  return (
    <header>
      <div className="h-auto w-screen">
        <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
          <div className="flex flex-row items-center px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-8 xl:px-20">
            <a href="/" className="text-xl font-medium flex items-center">
              <img
                src="/logo.png"
                className="w-14 h-14 rounded-full mr-2"
                alt="logo"
              />
              <span className="font-bold text-primary text-2xl">
                AI English Assistant
              </span>
            </a>

            <div className="hidden md:flex ml-24">
              {navigations.map((tab: Nav, idx: number) => (
                <a
                  className={`text-md font-semibold leading-6 mx-6 transition-colors duration-200 ${
                    selectedTab === tab.url
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-800 hover:text-primary"
                  }`}
                  key={idx}
                  href={tab.url}
                  target={tab.target}
                >
                  {tab.title}
                </a>
              ))}
            </div>

            <div className="flex-1"></div>

            <div className="flex flex-row items-center lg:flex lg:flex-row lg:space-x-3 lg:space-y-0">
              <div className="hidden md:block mr-4">{/* <Social /> */}</div>

              {user === undefined ? (
                <>loading...</>
              ) : (
                <>
                  {user ? (
                    <>
                      {user.credits && (
                        <a
                          href="/pricing"
                          className="hidden md:block mr-8 font-normal text-gray-800 cursor-pointer"
                        >
                          额度:{" "}
                          <span className="text-primary">
                            {user.credits.left_credits}
                          </span>
                        </a>
                      )}

                      <User user={user} />
                    </>
                  ) : (
                    <a className="cursor-pointer" href="/sign-in">
                      <Button>登录</Button>
                    </a>
                  )}
                </>
              )}
            </div>
            <a href="#" className="absolute right-5 lg:hidden"></a>
          </div>
        </nav>
      </div>
    </header>
  );
}
