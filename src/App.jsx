import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ViewAboutUs from "./pages/AboutUs/ViewAboutUs.jsx";
import EditAboutUs from "./pages/AboutUs/EditAboutUs.jsx";
import ViewLogos from "./pages/Logos/ViewLogos.jsx";
import AddLogo from "./pages/Logos/AddLogo";
import EditLogo from "./pages/Logos/EditLogo";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import EditContactUs from "./pages/ContactUs/EditContactUs.jsx";
import ViewBlogs from "./pages/Blogs/ViewBlogs.jsx";
import AddBlog from "./pages/Blogs/AddBlog.jsx";
import EditBlog from "./pages/Blogs/EditBlog.jsx";
import ViewBlogContent from "./pages/Blogs/ViewBlogContent.jsx";
import EditBlogContent from "./pages/Blogs/EditBlogContent.jsx";
import ViewWebDesign from "./pages/Website/ViewWebDesign.jsx";
import EditWebDesign from "./pages/Website/EditWebDesign.jsx";
import ViewWebDevelopment from "./pages/Website/ViewWebDevelopment.jsx";
import EditWebDevelopment from "./pages/Website/EditWebDevelopment.jsx";
import ViewWebMaintenance from "./pages/Website/ViewWebMaintenance.jsx";
import EditWebMaintenance from "./pages/Website/EditWebMaintenance.jsx";
import ViewAndroidDevelopment from "./pages/Mobile/ViewAndroidDevelopment.jsx";
import EditAndroidDevelopment from "./pages/Mobile/EditAndroidDevelopment.jsx";
import ViewIosDevelopment from "./pages/Mobile/ViewIosDevelopment.jsx";
import EditIosDevelopment from "./pages/Mobile/EditIosDevelopment.jsx";
import ViewCrossPlatform from "./pages/Mobile/ViewCrossPlatform.jsx";
import EditCrossPlatform from "./pages/Mobile/EditCrossPlatform.jsx";
import ViewLogoDesign from "./pages/Design/ViewLogoDesign.jsx";
import EditLogoDesign from "./pages/Design/EditLogoDesign.jsx";
import ViewVisitingCard from "./pages/Design/ViewVisitingCard.jsx";
import EditVisitingCard from "./pages/Design/EditVisitingCard.jsx";
import ViewBanners from "./pages/Banners/ViewBanners.jsx";
import EditBanner from "./pages/Banners/EditBanner.jsx";
import AddBanner from "./pages/Banners/AddBanner.jsx";
import ViewTestimonials from "./pages/Testimonials/ViewTestimonials.jsx";
import AddTestimonial from "./pages/Testimonials/AddTestimonial.jsx";
import EditTestimonial from "./pages/Testimonials/EditTestimonial.jsx";
import ViewTestimonialContent from "./pages/Testimonials/ViewTestimonialContent.jsx";
import EditTestimonialContent from "./pages/Testimonials/EditTestimonialContent.jsx";
import ViewReviews from "./pages/Reviews/ViewReviews.jsx";
import AddReview from "./pages/Reviews/AddReview.jsx";
import EditReview from "./pages/Reviews/EditReview.jsx";
import ViewServices from "./pages/Services/ViewServices.jsx";
import AddService from "./pages/Services/AddService.jsx";
import EditService from "./pages/Services/EditService.jsx";
import ViewWhyChooseUs from "./pages/WhyChooseUs/ViewWhyChooseUs.jsx";
import EditWhyChooseUs from "./pages/WhyChooseUs/EditWhyChooseUs.jsx";
import AddWhyChooseUs from "./pages/WhyChooseUs/AddWhyChooseUs.jsx";
import ViewHowWeWorks from "./pages/HowWeWorks/ViewHowWeWorks.jsx";
import AddHowWeWork from "./pages/HowWeWorks/AddHowWeWork.jsx";
import EditHowWeWork from "./pages/HowWeWorks/EditHowWeWork.jsx";
import ViewFacts from "./pages/Facts/ViewFacts.jsx";
import EditFact from "./pages/Facts/EditFact.jsx";
import ViewSettings from "./pages/Settings/ViewSettings.jsx";
import EditSettings from "./pages/Settings/EditSettings.jsx";
import ViewFooter from "./pages/Footer/ViewFooter.jsx";
import EditFooter from "./pages/Footer/EditFooter.jsx";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import WebDesign from "./pages/WebDesign.jsx";
import WebDevelopment from "./pages/WebDevelopment.jsx";
import WebMaintenance from "./pages/WebMaintenance.jsx";
import AndroidDevelopment from "./pages/AndroidDevelopment.jsx";
import IosDevelopment from "./pages/IosDevelopment.jsx";
import CrossPlatformDevelopment from "./pages/CrossPlatformDevelopment.jsx";
import LogoDesigning from "./pages/LogoDesigning.jsx";
import VisitingCardDesigning from "./pages/VisitingCardDesigning.jsx";
import Blog from "./pages/Blog.jsx";
import BlogContents from "./pages/BlogContents.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import ContactUs2 from "./pages/ContactUs2.jsx";
import LoadingIndicator from "./components/LoadingIndicater.jsx";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <LoadingIndicator />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<LoginPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/website" element={<WebDesign />} />
        <Route path="/website-design" element={<WebDesign />} />
        <Route path="/website-development" element={<WebDevelopment />} />
        <Route path="/website-maintenance" element={<WebMaintenance />} />
        <Route path="/android-development" element={<AndroidDevelopment />} />
        <Route path="/ios-development" element={<IosDevelopment />} />
        <Route
          path="/cross-platform-development"
          element={<CrossPlatformDevelopment />}
        />
        <Route path="/logo-designing" element={<LogoDesigning />} />
        <Route
          path="/visiting-card-designing"
          element={<VisitingCardDesigning />}
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogContents />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact-us" element={<ContactUs2 />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/about-us" element={<ViewAboutUs />} />
        <Route path="/dashboard/about-us/edit" element={<EditAboutUs />} />
        <Route path="/dashboard/view-logos" element={<ViewLogos />} />
        <Route path="/dashboard/view-logos/add" element={<AddLogo />} />
        <Route path="/dashboard/view-logos/edit/:id" element={<EditLogo />} />
        <Route path="/dashboard/contact-us" element={<ContactUs />} />
        <Route
          path="/dashboard/contact-us/edit/:id"
          element={<EditContactUs />}
        />
        <Route path="/dashboard/view-blogs" element={<ViewBlogs />} />
        <Route path="/dashboard/view-blogs/add" element={<AddBlog />} />
        <Route path="/dashboard/view-blogs/edit/:id" element={<EditBlog />} />
        {/* Single Blog Content */}
        <Route
          path="/dashboard/view-blogcontent"
          element={<ViewBlogContent />}
        />
        <Route
          path="/dashboard/view-blogcontent/edit"
          element={<EditBlogContent />}
        />
        <Route
          path="/dashboard/view-webdesign"
          element={<ViewWebDesign />}
        ></Route>
        <Route
          path="/dashboard/view-webdesign/edit"
          element={<EditWebDesign />}
        ></Route>
        <Route
          path="/dashboard/view-webdevelopment"
          element={<ViewWebDevelopment />}
        ></Route>
        <Route
          path="/dashboard/view-webdevelopment/edit"
          element={<EditWebDevelopment />}
        ></Route>
        <Route
          path="/dashboard/view-webmaintenance"
          element={<ViewWebMaintenance />}
        ></Route>
        <Route
          path="/dashboard/view-webmaintenance/edit"
          element={<EditWebMaintenance />}
        ></Route>
        <Route
          path="/dashboard/view-androiddevelopment"
          element={<ViewAndroidDevelopment />}
        ></Route>
        <Route
          path="/dashboard/view-androiddevelopment/edit"
          element={<EditAndroidDevelopment />}
        ></Route>
        <Route
          path="/dashboard/view-iosdevelopment"
          element={<ViewIosDevelopment />}
        ></Route>
        <Route
          path="/dashboard/view-iosdevelopment/edit"
          element={<EditIosDevelopment />}
        ></Route>
        <Route
          path="/dashboard/view-crossplatform"
          element={<ViewCrossPlatform />}
        ></Route>
        <Route
          path="/dashboard/view-crossplatform/edit"
          element={<EditCrossPlatform />}
        ></Route>
        <Route
          path="/dashboard/view-logodesign"
          element={<ViewLogoDesign />}
        ></Route>
        <Route
          path="/dashboard/view-logodesign/edit"
          element={<EditLogoDesign />}
        ></Route>
        <Route
          path="/dashboard/view-visitingcard"
          element={<ViewVisitingCard />}
        ></Route>
        <Route
          path="/dashboard/view-visitingcard/edit"
          element={<EditVisitingCard />}
        ></Route>
        <Route path="/dashboard/view-banners" element={<ViewBanners />}></Route>
        <Route
          path="/dashboard/view-banners/edit/:id"
          element={<EditBanner />}
        ></Route>
        <Route
          path="/dashboard/view-banners/add"
          element={<AddBanner />}
        ></Route>
        <Route
          path="/dashboard/view-testimonials"
          element={<ViewTestimonials />}
        />
        <Route
          path="/dashboard/view-testimonials/add"
          element={<AddTestimonial />}
        />
        <Route
          path="/dashboard/view-testimonials/edit/:id"
          element={<EditTestimonial />}
        />
        <Route
          path="/dashboard/view-testimonialcontent"
          element={<ViewTestimonialContent />}
        />
        <Route
          path="/dashboard/view-testimonialcontent/edit"
          element={<EditTestimonialContent />}
        />
        <Route path="/dashboard/view-reviews" element={<ViewReviews />} />
        <Route path="/dashboard/view-reviews/add" element={<AddReview />} />
        <Route
          path="/dashboard/view-reviews/edit/:id"
          element={<EditReview />}
        />
        <Route path="/dashboard/view-services" element={<ViewServices />} />
        <Route path="/dashboard/view-services/add" element={<AddService />} />
        <Route
          path="/dashboard/view-services/edit/:id"
          element={<EditService />}
        />
        <Route
          path="/dashboard/view-whychooseus"
          element={<ViewWhyChooseUs />}
        ></Route>
        <Route
          path="/dashboard/view-whychooseus/edit/:id"
          element={<EditWhyChooseUs />}
        ></Route>
        <Route
          path="/dashboard/view-whychooseus/add"
          element={<AddWhyChooseUs />}
        ></Route>
        <Route path="/dashboard/view-howweworks" element={<ViewHowWeWorks />} />
        <Route
          path="/dashboard/view-howweworks/add"
          element={<AddHowWeWork />}
        />
        <Route
          path="/dashboard/view-howweworks/edit/:id"
          element={<EditHowWeWork />}
        />
        <Route path="/dashboard/view-facts" element={<ViewFacts />}></Route>
        <Route
          path="/dashboard/view-facts/edit/:id"
          element={<EditFact />}
        ></Route>
        <Route path="/dashboard/view-settings" element={<ViewSettings />} />
        <Route
          path="/dashboard/view-settings/edit"
          element={<EditSettings />}
        />
        <Route path="/dashboard/view-footer" element={<ViewFooter />} />
        <Route path="/dashboard/view-footer/edit" element={<EditFooter />} />
      </Routes>
    </Router>
  );
}

export default App;
