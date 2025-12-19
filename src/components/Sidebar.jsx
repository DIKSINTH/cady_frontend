import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiMonitor,
  FiUser,
  FiChevronDown,
  FiSettings,
  FiStar,
  FiLayers,
  FiTool,
  FiGrid,
  FiCode,
  FiSmartphone,
  FiImage,
  FiFeather,
} from "react-icons/fi";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [dropdown, setDropdown] = useState({
    about: false,
    blogs: false,
    website: false,
    mobile: false,
    graphics: false,
    banners: false,
    testimonials: false,
    reviews: false,
    services: false,
    whychoose: false,
    howwework: false,
  });

  const toggleDropdown = (key) =>
    setDropdown({ ...dropdown, [key]: !dropdown[key] });

  return (
    <div
      className={`${
        open ? "w-64" : "w-16"
      } h-screen fixed bg-white shadow-md transition-all duration-300 overflow-y-auto no-scrollbar z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 sticky top-0 bg-white z-10">
        {open && (
          <h1 className="text-xl font-bold text-blue-600 whitespace-nowrap">
            # CADYINFOTECH
          </h1>
        )}
        <FiMenu
          className="text-2xl cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* Menu */}
      <div className="p-3 space-y-2">
        <NavItem
          icon={<FiHome />}
          label="Dashboard"
          open={open}
          route="/dashboard"
        />

        {/* ABOUT US */}
        <DropdownNav
          label="About Us"
          icon={<FiMonitor />}
          open={open}
          dropdown={dropdown.about}
          toggle={() => toggleDropdown("about")}
          items={["View AboutUs", "View Logos"]}
          routes={["/dashboard/about-us", "/dashboard/view-logos"]}
        />

        <NavItem
          icon={<FiUser />}
          label="Contact Us"
          open={open}
          route="/dashboard/contact-us"
        />

        {/* BLOGS */}
        <DropdownNav
          label="Blogs"
          icon={<FiLayers />}
          open={open}
          dropdown={dropdown.blogs}
          toggle={() => toggleDropdown("blogs")}
          items={["View Blogs", "View Blogcontent"]}
          routes={["/dashboard/view-blogs", "/dashboard/view-blogcontent"]}
        />

        {/* WEBSITE */}
        <DropdownNav
          label="Website"
          icon={<FiCode />}
          open={open}
          dropdown={dropdown.website}
          toggle={() => toggleDropdown("website")}
          items={[
            "Website Design",
            "Website Development",
            "Website Maintenance",
          ]}
          routes={[
            "/dashboard/view-webdesign",
            "/dashboard/view-webdevelopment",
            "/dashboard/view-webmaintenance",
          ]}
        />

        {/* MOBILE */}
        <DropdownNav
          label="Mobile"
          icon={<FiSmartphone />}
          open={open}
          dropdown={dropdown.mobile}
          toggle={() => toggleDropdown("mobile")}
          items={[
            "Android App Development",
            "iOS Development",
            "CrossPlatform Development",
          ]}
          routes={[
            "/dashboard/view-androiddevelopment",
            "/dashboard/view-iosdevelopment",
            "/dashboard/view-crossplatform",
          ]}
        />

        {/* GRAPHICS */}
        <DropdownNav
          label="Graphics"
          icon={<FiFeather />}
          open={open}
          dropdown={dropdown.graphics}
          toggle={() => toggleDropdown("graphics")}
          items={["Logo Designing", "Visiting Card"]}
          routes={[
            "/dashboard/view-logodesign",
            "/dashboard/view-visitingcard",
          ]}
        />

        {/* BANNERS */}
        <DropdownNav
          label="Banners"
          icon={<FiImage />}
          open={open}
          dropdown={dropdown.banners}
          toggle={() => toggleDropdown("banners")}
          items={["View Banners"]}
          routes={["/dashboard/view-banners"]}
        />

        {/* TESTIMONIALS */}
        <DropdownNav
          label="Testimonials"
          icon={<FiStar />}
          open={open}
          dropdown={dropdown.testimonials}
          toggle={() => toggleDropdown("testimonials")}
          items={["View Testimonials", "View TestimonialContent"]}
          routes={[
            "/dashboard/view-testimonials",
            "/dashboard/view-testimonialcontent",
          ]}
        />

        {/* REVIEWS */}
        <DropdownNav
          label="Reviews"
          icon={<FiTool />}
          open={open}
          dropdown={dropdown.reviews}
          toggle={() => toggleDropdown("reviews")}
          items={["View Reviews"]}
          routes={["/dashboard/view-reviews"]}
        />

        {/* SERVICES */}
        <DropdownNav
          label="Services"
          icon={<FiGrid />}
          open={open}
          dropdown={dropdown.services}
          toggle={() => toggleDropdown("services")}
          items={["View Services"]}
          routes={["/dashboard/view-services"]}
        />

        {/* WHY CHOOSE US */}
        <DropdownNav
          label="Why Choose Us"
          icon={<FiMonitor />}
          open={open}
          dropdown={dropdown.whychoose}
          toggle={() => toggleDropdown("whychoose")}
          items={["View Whychooseus"]}
          routes={["/dashboard/view-whychooseus"]}
        />

        {/* HOW WE WORK */}
        <DropdownNav
          label="How We Works"
          icon={<FiMonitor />}
          open={open}
          dropdown={dropdown.howwework}
          toggle={() => toggleDropdown("howwework")}
          items={["View Howweworks"]}
          routes={["/dashboard/view-howweworks"]}
        />

        <NavItem
          icon={<FiStar />}
          label="Fact"
          open={open}
          route="/dashboard/view-facts"
        />
        <NavItem
          icon={<FiSettings />}
          label="Settings"
          open={open}
          route="/dashboard/view-settings"
        />
        <NavItem
          icon={<FiMonitor />}
          label="Footer"
          open={open}
          route="/dashboard/view-footer"
        />
      </div>
    </div>
  );
}

/* SINGLE ITEM */
function NavItem({ icon, label, open, route }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
      onClick={() => route && navigate(route)}
    >
      <span className="text-xl">{icon}</span>
      {open && <span className="whitespace-nowrap">{label}</span>}
    </div>
  );
}

/* DROPDOWN ITEM */
function DropdownNav({ label, icon, open, dropdown, toggle, items, routes }) {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
        onClick={toggle}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          {open && <span className="whitespace-nowrap">{label}</span>}
        </div>

        {open && (
          <FiChevronDown
            className={`${dropdown ? "rotate-180" : ""} transition`}
          />
        )}
      </div>

      {dropdown && open && (
        <div className="ml-10 mt-1 space-y-1 pb-2">
          {items.map((item, index) => (
            <p
              key={index}
              className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer whitespace-nowrap"
              onClick={() => routes && routes[index] && navigate(routes[index])}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
