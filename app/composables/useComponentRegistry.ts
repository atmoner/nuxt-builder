import type { ComponentDefinition, PropSchema } from "./useBuilder"

const componentDefinitions: Map<string, ComponentDefinition> = new Map()

// Register all available components
const defaultComponents: ComponentDefinition[] = [
  // ============== HERO COMPONENTS ==============
  {
    type: "HeroSimple",
    name: "Hero Simple",
    icon: "🌟",
    category: "hero",
    defaultProps: {
      title: "Welcome to Our Website",
      subtitle: "Build something amazing with our powerful tools",
      buttonText: "Get Started",
      buttonUrl: "#",
      buttonVariant: "primary",
      alignment: "center",
      backgroundType: "gradient",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "title",
        label: "Title",
        type: "string",
        default: "Welcome to Our Website",
      },
      {
        name: "subtitle",
        label: "Subtitle",
        type: "string",
        default: "Build something amazing with our powerful tools",
      },
      {
        name: "buttonText",
        label: "Button Text",
        type: "string",
        default: "Get Started",
      },
      {
        name: "buttonUrl",
        label: "Button URL",
        type: "string",
        default: "#",
        placeholder: "/get-started or https://example.com",
      },
      {
        name: "buttonVariant",
        label: "Button Style",
        type: "select",
        default: "primary",
        options: [
          { label: "Primary", value: "primary" },
          { label: "Secondary", value: "secondary" },
          { label: "White", value: "white" },
        ],
      },
      {
        name: "alignment",
        label: "Text Alignment",
        type: "select",
        default: "center",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
        ],
      },
      {
        name: "backgroundType",
        label: "Background",
        type: "select",
        default: "gradient",
        options: [
          { label: "Gradient", value: "gradient" },
          { label: "Dark", value: "dark" },
          { label: "Light", value: "light" },
        ],
      },
      {
        name: "backgroundColor",
        label: "Background Color (overrides Background)",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "HeroSplit",
    name: "Hero Split",
    icon: "🖼️",
    category: "hero",
    defaultProps: {
      title: "Modern Design Solutions",
      subtitle:
        "Create stunning websites with our drag-and-drop builder. No coding required.",
      buttonText: "Start Building",
      buttonUrl: "#",
      secondaryButtonText: "Learn More",
      secondaryButtonUrl: "#",
      imagePosition: "right",
      imageUrl: "",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "title",
        label: "Title",
        type: "string",
        default: "Modern Design Solutions",
      },
      {
        name: "subtitle",
        label: "Subtitle",
        type: "string",
        default:
          "Create stunning websites with our drag-and-drop builder. No coding required.",
      },
      {
        name: "buttonText",
        label: "Primary Button",
        type: "string",
        default: "Start Building",
      },
      {
        name: "buttonUrl",
        label: "Primary Button URL",
        type: "string",
        default: "#",
        placeholder: "/start or https://example.com",
      },
      {
        name: "secondaryButtonText",
        label: "Secondary Button",
        type: "string",
        default: "Learn More",
      },
      {
        name: "secondaryButtonUrl",
        label: "Secondary Button URL",
        type: "string",
        default: "#",
        placeholder: "/learn-more",
      },
      {
        name: "imagePosition",
        label: "Image Position",
        type: "select",
        default: "right",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
      {
        name: "imageUrl",
        label: "Image URL",
        type: "string",
        default: "",
        placeholder: "https://example.com/image.jpg",
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "HeroWithImage",
    name: "Hero Background",
    icon: "🏞️",
    category: "hero",
    defaultProps: {
      title: "Transform Your Ideas",
      subtitle: "Bring your vision to life with our powerful platform",
      buttonText: "Explore Now",
      buttonUrl: "#",
      overlayOpacity: "50",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "title",
        label: "Title",
        type: "string",
        default: "Transform Your Ideas",
      },
      {
        name: "subtitle",
        label: "Subtitle",
        type: "string",
        default: "Bring your vision to life with our powerful platform",
      },
      {
        name: "buttonText",
        label: "Button Text",
        type: "string",
        default: "Explore Now",
      },
      {
        name: "buttonUrl",
        label: "Button URL",
        type: "string",
        default: "#",
        placeholder: "/explore",
      },
      {
        name: "overlayOpacity",
        label: "Overlay Darkness",
        type: "select",
        default: "50",
        options: [
          { label: "Light", value: "30" },
          { label: "Medium", value: "50" },
          { label: "Dark", value: "70" },
        ],
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "color",
        default: "",
      },
    ],
  },

  // ============== HEADER COMPONENTS ==============
  {
    type: "HeaderSimple",
    name: "Header Simple",
    icon: "📍",
    category: "header",
    defaultProps: {
      logo: "MyBrand",
      links: "Home|/, About|/about, Services|/services, Contact|/contact",
      buttonText: "Sign Up",
      buttonUrl: "#",
      sticky: false,
      backgroundColor: "",
    },
    propsSchema: [
      { name: "logo", label: "Logo Text", type: "string", default: "MyBrand" },
      {
        name: "links",
        label: "Navigation Links",
        type: "string",
        default: "Home|/, About|/about, Services|/services, Contact|/contact",
        placeholder: "Label|URL, Label|URL (ex: Home|/, About|/about)",
      },
      {
        name: "buttonText",
        label: "CTA Button",
        type: "string",
        default: "Sign Up",
      },
      {
        name: "buttonUrl",
        label: "CTA Button URL",
        type: "string",
        default: "#",
        placeholder: "/signup",
      },
      {
        name: "sticky",
        label: "Sticky Header",
        type: "boolean",
        default: false,
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "HeaderCentered",
    name: "Header Centered",
    icon: "🎯",
    category: "header",
    defaultProps: {
      logo: "LOGO",
      links:
        "Products|/products, Solutions|/solutions, Pricing|/pricing, About|/about",
      showSearch: true,
      theme: "light",
      backgroundColor: "",
    },
    propsSchema: [
      { name: "logo", label: "Logo Text", type: "string", default: "LOGO" },
      {
        name: "links",
        label: "Navigation Links",
        type: "string",
        default:
          "Products|/products, Solutions|/solutions, Pricing|/pricing, About|/about",
        placeholder: "Label|URL, Label|URL (ex: Products|/products)",
      },
      {
        name: "showSearch",
        label: "Show Search",
        type: "boolean",
        default: true,
      },
      {
        name: "theme",
        label: "Theme",
        type: "select",
        default: "light",
        options: [
          { label: "Light", value: "light" },
          { label: "Dark", value: "dark" },
        ],
      },
    ],
  },
  {
    type: "HeaderMega",
    name: "Header Mega Menu",
    icon: "📂",
    category: "header",
    defaultProps: {
      logo: "Enterprise",
      showDropdown: true,
      buttonText: "Contact Sales",
      buttonUrl: "#",
      theme: "light",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "logo",
        label: "Logo Text",
        type: "string",
        default: "Enterprise",
      },
      {
        name: "showDropdown",
        label: "Show Dropdown Indicator",
        type: "boolean",
        default: true,
      },
      {
        name: "buttonText",
        label: "CTA Button",
        type: "string",
        default: "Contact Sales",
      },
      {
        name: "buttonUrl",
        label: "CTA Button URL",
        type: "string",
        default: "#",
        placeholder: "/contact",
      },
      {
        name: "theme",
        label: "Theme",
        type: "select",
        default: "light",
        options: [
          { label: "Light", value: "light" },
          { label: "Dark", value: "dark" },
        ],
      },
      {
        name: "backgroundColor",
        label: "Background Color (overrides Theme)",
        type: "color",
        default: "",
      },
    ],
  },

  // ============== FOOTER COMPONENTS ==============
  {
    type: "FooterSimple",
    name: "Footer Simple",
    icon: "📄",
    category: "footer",
    defaultProps: {
      companyName: "MyCompany",
      year: "2026",
      links: "Privacy|/privacy, Terms|/terms, Contact|/contact",
      theme: "dark",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "companyName",
        label: "Company Name",
        type: "string",
        default: "MyCompany",
      },
      { name: "year", label: "Year", type: "string", default: "2026" },
      {
        name: "links",
        label: "Links",
        type: "string",
        default: "Privacy|/privacy, Terms|/terms, Contact|/contact",
        placeholder: "Label|URL, Label|URL (ex: Privacy|/privacy)",
      },
      {
        name: "theme",
        label: "Theme",
        type: "select",
        default: "dark",
        options: [
          { label: "Light", value: "light" },
          { label: "Dark", value: "dark" },
        ],
      },
      {
        name: "backgroundColor",
        label: "Background Color (overrides Theme)",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "FooterColumns",
    name: "Footer Columns",
    icon: "📊",
    category: "footer",
    defaultProps: {
      companyName: "Company",
      description: "Building the future of web development.",
      column1Title: "Product",
      column1Links: "Features|/features, Pricing|/pricing, Docs|/docs",
      column2Title: "Company",
      column2Links: "About|/about, Blog|/blog, Careers|/careers",
      column3Title: "Support",
      column3Links: "Help|/help, Contact|/contact, Status|/status",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "companyName",
        label: "Company Name",
        type: "string",
        default: "Company",
      },
      {
        name: "description",
        label: "Description",
        type: "string",
        default: "Building the future of web development.",
      },
      {
        name: "column1Title",
        label: "Column 1 Title",
        type: "string",
        default: "Product",
      },
      {
        name: "column1Links",
        label: "Column 1 Links",
        type: "string",
        default: "Features|/features, Pricing|/pricing, Docs|/docs",
        placeholder: "Label|URL, Label|URL",
      },
      {
        name: "column2Title",
        label: "Column 2 Title",
        type: "string",
        default: "Company",
      },
      {
        name: "column2Links",
        label: "Column 2 Links",
        type: "string",
        default: "About|/about, Blog|/blog, Careers|/careers",
        placeholder: "Label|URL, Label|URL",
      },
      {
        name: "column3Title",
        label: "Column 3 Title",
        type: "string",
        default: "Support",
      },
      {
        name: "column3Links",
        label: "Column 3 Links",
        type: "string",
        default: "Help|/help, Contact|/contact, Status|/status",
        placeholder: "Label|URL, Label|URL",
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "FooterNewsletter",
    name: "Footer Newsletter",
    icon: "📧",
    category: "footer",
    defaultProps: {
      companyName: "Newsletter Co",
      title: "Subscribe to our newsletter",
      subtitle: "Get the latest news and updates delivered to your inbox.",
      buttonText: "Subscribe",
      showSocials: true,
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "companyName",
        label: "Company Name",
        type: "string",
        default: "Newsletter Co",
      },
      {
        name: "title",
        label: "Newsletter Title",
        type: "string",
        default: "Subscribe to our newsletter",
      },
      {
        name: "subtitle",
        label: "Newsletter Subtitle",
        type: "string",
        default: "Get the latest news and updates delivered to your inbox.",
      },
      {
        name: "buttonText",
        label: "Button Text",
        type: "string",
        default: "Subscribe",
      },
      {
        name: "showSocials",
        label: "Show Social Icons",
        type: "boolean",
        default: true,
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "color",
        default: "",
      },
    ],
  },

  // ============== CONTENT COMPONENTS ==============
  {
    type: "ContentFeatures",
    name: "Features Grid",
    icon: "✨",
    category: "content",
    defaultProps: {
      title: "Our Features",
      subtitle: "Everything you need to build amazing products",
      columns: 3,
      feature1Title: "Fast Performance",
      feature1Desc: "Lightning-fast loading speeds",
      feature2Title: "Secure",
      feature2Desc: "Enterprise-grade security",
      feature3Title: "Scalable",
      feature3Desc: "Grows with your business",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "title",
        label: "Section Title",
        type: "string",
        default: "Our Features",
      },
      {
        name: "subtitle",
        label: "Section Subtitle",
        type: "string",
        default: "Everything you need to build amazing products",
      },
      {
        name: "columns",
        label: "Columns",
        type: "select",
        default: 3,
        options: [
          { label: "2 Columns", value: 2 },
          { label: "3 Columns", value: 3 },
          { label: "4 Columns", value: 4 },
        ],
      },
      {
        name: "feature1Title",
        label: "Feature 1 Title",
        type: "string",
        default: "Fast Performance",
      },
      {
        name: "feature1Desc",
        label: "Feature 1 Description",
        type: "string",
        default: "Lightning-fast loading speeds",
      },
      {
        name: "feature2Title",
        label: "Feature 2 Title",
        type: "string",
        default: "Secure",
      },
      {
        name: "feature2Desc",
        label: "Feature 2 Description",
        type: "string",
        default: "Enterprise-grade security",
      },
      {
        name: "feature3Title",
        label: "Feature 3 Title",
        type: "string",
        default: "Scalable",
      },
      {
        name: "feature3Desc",
        label: "Feature 3 Description",
        type: "string",
        default: "Grows with your business",
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "ContentTestimonials",
    name: "Testimonials",
    icon: "💬",
    category: "content",
    defaultProps: {
      title: "What Our Customers Say",
      testimonial1Text:
        "This product changed our business completely. Highly recommended!",
      testimonial1Author: "John Doe",
      testimonial1Role: "CEO at TechCorp",
      testimonial2Text:
        "Amazing experience from start to finish. The team is fantastic!",
      testimonial2Author: "Jane Smith",
      testimonial2Role: "Designer at Creative Co",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "title",
        label: "Section Title",
        type: "string",
        default: "What Our Customers Say",
      },
      {
        name: "testimonial1Text",
        label: "Testimonial 1",
        type: "string",
        default:
          "This product changed our business completely. Highly recommended!",
      },
      {
        name: "testimonial1Author",
        label: "Author 1",
        type: "string",
        default: "John Doe",
      },
      {
        name: "testimonial1Role",
        label: "Role 1",
        type: "string",
        default: "CEO at TechCorp",
      },
      {
        name: "testimonial2Text",
        label: "Testimonial 2",
        type: "string",
        default:
          "Amazing experience from start to finish. The team is fantastic!",
      },
      {
        name: "testimonial2Author",
        label: "Author 2",
        type: "string",
        default: "Jane Smith",
      },
      {
        name: "testimonial2Role",
        label: "Role 2",
        type: "string",
        default: "Designer at Creative Co",
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "ContentPricing",
    name: "Pricing Table",
    icon: "💰",
    category: "content",
    defaultProps: {
      title: "Simple Pricing",
      subtitle: "Choose the plan that works for you",
      plan1Name: "Starter",
      plan1Price: "$9",
      plan1Features: "5 Projects, Basic Support, 1GB Storage",
      plan1ButtonUrl: "#",
      plan2Name: "Pro",
      plan2Price: "$29",
      plan2Features: "Unlimited Projects, Priority Support, 10GB Storage",
      plan2Highlighted: true,
      plan2ButtonUrl: "#",
      plan3Name: "Enterprise",
      plan3Price: "$99",
      plan3Features:
        "Everything in Pro, Custom Integrations, Dedicated Support",
      plan3ButtonUrl: "#",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "title",
        label: "Section Title",
        type: "string",
        default: "Simple Pricing",
      },
      {
        name: "subtitle",
        label: "Section Subtitle",
        type: "string",
        default: "Choose the plan that works for you",
      },
      {
        name: "plan1Name",
        label: "Plan 1 Name",
        type: "string",
        default: "Starter",
      },
      {
        name: "plan1Price",
        label: "Plan 1 Price",
        type: "string",
        default: "$9",
      },
      {
        name: "plan1Features",
        label: "Plan 1 Features (comma separated)",
        type: "string",
        default: "5 Projects, Basic Support, 1GB Storage",
      },
      {
        name: "plan1ButtonUrl",
        label: "Plan 1 Button URL",
        type: "string",
        default: "#",
        placeholder: "/signup?plan=starter",
      },
      {
        name: "plan2Name",
        label: "Plan 2 Name",
        type: "string",
        default: "Pro",
      },
      {
        name: "plan2Price",
        label: "Plan 2 Price",
        type: "string",
        default: "$29",
      },
      {
        name: "plan2Features",
        label: "Plan 2 Features (comma separated)",
        type: "string",
        default: "Unlimited Projects, Priority Support, 10GB Storage",
      },
      {
        name: "plan2Highlighted",
        label: "Highlight Plan 2",
        type: "boolean",
        default: true,
      },
      {
        name: "plan2ButtonUrl",
        label: "Plan 2 Button URL",
        type: "string",
        default: "#",
        placeholder: "/signup?plan=pro",
      },
      {
        name: "plan3Name",
        label: "Plan 3 Name",
        type: "string",
        default: "Enterprise",
      },
      {
        name: "plan3Price",
        label: "Plan 3 Price",
        type: "string",
        default: "$99",
      },
      {
        name: "plan3Features",
        label: "Plan 3 Features (comma separated)",
        type: "string",
        default: "Everything in Pro, Custom Integrations, Dedicated Support",
      },
      {
        name: "plan3ButtonUrl",
        label: "Plan 3 Button URL",
        type: "string",
        default: "#",
        placeholder: "/contact?plan=enterprise",
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "ContentCTA",
    name: "Call to Action",
    icon: "📢",
    category: "content",
    defaultProps: {
      title: "Ready to Get Started?",
      subtitle: "Join thousands of satisfied customers today",
      buttonText: "Start Free Trial",
      buttonUrl: "#",
      secondaryButtonText: "Contact Sales",
      secondaryButtonUrl: "#",
      variant: "primary",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "title",
        label: "Title",
        type: "string",
        default: "Ready to Get Started?",
      },
      {
        name: "subtitle",
        label: "Subtitle",
        type: "string",
        default: "Join thousands of satisfied customers today",
      },
      {
        name: "buttonText",
        label: "Primary Button",
        type: "string",
        default: "Start Free Trial",
      },
      {
        name: "buttonUrl",
        label: "Primary Button URL",
        type: "string",
        default: "#",
        placeholder: "/signup",
      },
      {
        name: "secondaryButtonText",
        label: "Secondary Button",
        type: "string",
        default: "Contact Sales",
      },
      {
        name: "secondaryButtonUrl",
        label: "Secondary Button URL",
        type: "string",
        default: "#",
        placeholder: "/contact",
      },
      {
        name: "variant",
        label: "Background Style",
        type: "select",
        default: "primary",
        options: [
          { label: "Primary Color", value: "primary" },
          { label: "Dark", value: "dark" },
          { label: "Light", value: "light" },
        ],
      },
      {
        name: "backgroundColor",
        label: "Background Color (overrides Style)",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "ContentStats",
    name: "Statistics",
    icon: "📈",
    category: "content",
    defaultProps: {
      stat1Value: "10K+",
      stat1Label: "Happy Customers",
      stat2Value: "99.9%",
      stat2Label: "Uptime",
      stat3Value: "24/7",
      stat3Label: "Support",
      stat4Value: "150+",
      stat4Label: "Countries",
      theme: "light",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "stat1Value",
        label: "Stat 1 Value",
        type: "string",
        default: "10K+",
      },
      {
        name: "stat1Label",
        label: "Stat 1 Label",
        type: "string",
        default: "Happy Customers",
      },
      {
        name: "stat2Value",
        label: "Stat 2 Value",
        type: "string",
        default: "99.9%",
      },
      {
        name: "stat2Label",
        label: "Stat 2 Label",
        type: "string",
        default: "Uptime",
      },
      {
        name: "stat3Value",
        label: "Stat 3 Value",
        type: "string",
        default: "24/7",
      },
      {
        name: "stat3Label",
        label: "Stat 3 Label",
        type: "string",
        default: "Support",
      },
      {
        name: "stat4Value",
        label: "Stat 4 Value",
        type: "string",
        default: "150+",
      },
      {
        name: "stat4Label",
        label: "Stat 4 Label",
        type: "string",
        default: "Countries",
      },
      {
        name: "theme",
        label: "Theme",
        type: "select",
        default: "light",
        options: [
          { label: "Light", value: "light" },
          { label: "Dark", value: "dark" },
          { label: "Primary", value: "primary" },
        ],
      },
      {
        name: "backgroundColor",
        label: "Background Color (overrides Theme)",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "ContentTeam",
    name: "Team Section",
    icon: "👥",
    category: "content",
    defaultProps: {
      title: "Meet Our Team",
      subtitle: "The talented people behind our success",
      members: JSON.stringify([
        {
          name: "John Doe",
          role: "CEO & Founder",
          image: "https://i.pravatar.cc/300?img=1",
          bio: "Leading with vision and passion",
        },
        {
          name: "Jane Smith",
          role: "CTO",
          image: "https://i.pravatar.cc/300?img=2",
          bio: "Tech expert and innovator",
        },
        {
          name: "Mike Johnson",
          role: "Designer",
          image: "https://i.pravatar.cc/300?img=3",
          bio: "Creating beautiful experiences",
        },
      ]),
      columns: 3,
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "title",
        label: "Title",
        type: "string",
        default: "Meet Our Team",
      },
      {
        name: "subtitle",
        label: "Subtitle",
        type: "string",
        default: "The talented people behind our success",
      },
      {
        name: "members",
        label: "Team Members (JSON)",
        type: "string",
        default: JSON.stringify([
          {
            name: "John Doe",
            role: "CEO",
            image: "https://i.pravatar.cc/300?img=1",
            bio: "Leading with vision",
          },
        ]),
      },
      {
        name: "columns",
        label: "Columns",
        type: "select",
        default: 3,
        options: [
          { label: "2 Columns", value: 2 },
          { label: "3 Columns", value: 3 },
          { label: "4 Columns", value: 4 },
        ],
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "ContentBlog",
    name: "Blog Posts",
    icon: "📰",
    category: "content",
    defaultProps: {
      title: "Latest Articles",
      subtitle: "Insights, tips, and stories from our team",
      posts: JSON.stringify([
        {
          title: "Getting Started with Web Design",
          excerpt: "Learn the basics of modern web design principles...",
          image: "https://picsum.photos/400/250?random=1",
          date: "Jan 15, 2026",
          author: "John Doe",
          category: "Design",
        },
        {
          title: "10 Tips for Better UX",
          excerpt: "Improve your user experience with these proven tips...",
          image: "https://picsum.photos/400/250?random=2",
          date: "Jan 12, 2026",
          author: "Jane Smith",
          category: "UX",
        },
        {
          title: "The Future of Development",
          excerpt: "Exploring upcoming trends in web development...",
          image: "https://picsum.photos/400/250?random=3",
          date: "Jan 10, 2026",
          author: "Mike Johnson",
          category: "Development",
        },
      ]),
      layout: "grid",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "title",
        label: "Title",
        type: "string",
        default: "Latest Articles",
      },
      {
        name: "subtitle",
        label: "Subtitle",
        type: "string",
        default: "Insights, tips, and stories from our team",
      },
      {
        name: "posts",
        label: "Posts (JSON)",
        type: "string",
        default: JSON.stringify([
          {
            title: "Article Title",
            excerpt: "Article excerpt...",
            image: "https://picsum.photos/400/250",
            date: "Jan 1, 2026",
            author: "Author",
            category: "Category",
          },
        ]),
      },
      {
        name: "layout",
        label: "Layout",
        type: "select",
        default: "grid",
        options: [
          { label: "Grid", value: "grid" },
          { label: "List", value: "list" },
        ],
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "ContentFAQ",
    name: "FAQ Section",
    icon: "❓",
    category: "content",
    defaultProps: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions",
      questions: JSON.stringify([
        {
          question: "What is your product?",
          answer:
            "Our product is a powerful tool designed to help you achieve your goals efficiently.",
        },
        {
          question: "How does it work?",
          answer:
            "Simply sign up, configure your settings, and start using our intuitive interface.",
        },
        {
          question: "What are the pricing plans?",
          answer:
            "We offer flexible pricing plans to suit teams of all sizes. Check our pricing page for details.",
        },
        {
          question: "Do you offer support?",
          answer:
            "Yes! We provide 24/7 customer support via email, chat, and phone.",
        },
      ]),
      layout: "accordion",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "title",
        label: "Title",
        type: "string",
        default: "Frequently Asked Questions",
      },
      {
        name: "subtitle",
        label: "Subtitle",
        type: "string",
        default: "Find answers to common questions",
      },
      {
        name: "questions",
        label: "Questions (JSON)",
        type: "string",
        default: JSON.stringify([
          { question: "Question?", answer: "Answer here." },
        ]),
      },
      {
        name: "layout",
        label: "Layout",
        type: "select",
        default: "accordion",
        options: [
          { label: "Accordion", value: "accordion" },
          { label: "Two Column", value: "two-column" },
        ],
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "ContentGallery",
    name: "Image Gallery",
    icon: "🖼️",
    category: "content",
    defaultProps: {
      title: "Gallery",
      subtitle: "Explore our work and projects",
      images: JSON.stringify([
        {
          url: "https://picsum.photos/600/400?random=1",
          caption: "Project 1",
        },
        {
          url: "https://picsum.photos/600/400?random=2",
          caption: "Project 2",
        },
        {
          url: "https://picsum.photos/600/400?random=3",
          caption: "Project 3",
        },
        {
          url: "https://picsum.photos/600/400?random=4",
          caption: "Project 4",
        },
        {
          url: "https://picsum.photos/600/400?random=5",
          caption: "Project 5",
        },
        {
          url: "https://picsum.photos/600/400?random=6",
          caption: "Project 6",
        },
      ]),
      columns: 3,
      gap: "md",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "title",
        label: "Title",
        type: "string",
        default: "Gallery",
      },
      {
        name: "subtitle",
        label: "Subtitle",
        type: "string",
        default: "Explore our work and projects",
      },
      {
        name: "images",
        label: "Images (JSON)",
        type: "string",
        default: JSON.stringify([
          { url: "https://picsum.photos/600/400", caption: "Image 1" },
        ]),
      },
      {
        name: "columns",
        label: "Columns",
        type: "select",
        default: 3,
        options: [
          { label: "2 Columns", value: 2 },
          { label: "3 Columns", value: 3 },
          { label: "4 Columns", value: 4 },
        ],
      },
      {
        name: "gap",
        label: "Gap",
        type: "select",
        default: "md",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
        ],
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "ContentTimeline",
    name: "Timeline",
    icon: "📅",
    category: "content",
    defaultProps: {
      title: "Our Journey",
      subtitle: "Key milestones in our story",
      events: JSON.stringify([
        {
          year: "2020",
          title: "Company Founded",
          description: "Started with a vision to change the industry",
        },
        {
          year: "2021",
          title: "First Product Launch",
          description: "Released our flagship product to the market",
        },
        {
          year: "2023",
          title: "Global Expansion",
          description: "Opened offices in 10+ countries",
        },
        {
          year: "2025",
          title: "Major Innovation",
          description: "Launched groundbreaking new features",
        },
      ]),
      orientation: "vertical",
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "title",
        label: "Title",
        type: "string",
        default: "Our Journey",
      },
      {
        name: "subtitle",
        label: "Subtitle",
        type: "string",
        default: "Key milestones in our story",
      },
      {
        name: "events",
        label: "Events (JSON)",
        type: "string",
        default: JSON.stringify([
          { year: "2020", title: "Event", description: "Description" },
        ]),
      },
      {
        name: "orientation",
        label: "Orientation",
        type: "select",
        default: "vertical",
        options: [
          { label: "Vertical", value: "vertical" },
          { label: "Horizontal", value: "horizontal" },
        ],
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "color",
        default: "",
      },
    ],
  },
  {
    type: "ContentLogos",
    name: "Logo Showcase",
    icon: "🏢",
    category: "content",
    defaultProps: {
      title: "Trusted By",
      subtitle: "Leading companies around the world",
      logos: JSON.stringify([
        {
          name: "Company 1",
          url: "https://via.placeholder.com/150x60?text=Logo+1",
        },
        {
          name: "Company 2",
          url: "https://via.placeholder.com/150x60?text=Logo+2",
        },
        {
          name: "Company 3",
          url: "https://via.placeholder.com/150x60?text=Logo+3",
        },
        {
          name: "Company 4",
          url: "https://via.placeholder.com/150x60?text=Logo+4",
        },
        {
          name: "Company 5",
          url: "https://via.placeholder.com/150x60?text=Logo+5",
        },
        {
          name: "Company 6",
          url: "https://via.placeholder.com/150x60?text=Logo+6",
        },
      ]),
      backgroundColor: "",
    },
    propsSchema: [
      {
        name: "title",
        label: "Title",
        type: "string",
        default: "Trusted By",
      },
      {
        name: "subtitle",
        label: "Subtitle",
        type: "string",
        default: "Leading companies around the world",
      },
      {
        name: "logos",
        label: "Logos (JSON)",
        type: "string",
        default: JSON.stringify([
          { name: "Company", url: "https://via.placeholder.com/150x60" },
        ]),
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "color",
        default: "",
      },
    ],
  },

  // ============== UI COMPONENTS ==============
  {
    type: "UiButton",
    name: "Button",
    icon: "🔘",
    category: "ui",
    defaultProps: {
      label: "Button",
      variant: "primary",
      size: "md",
      disabled: false,
    },
    propsSchema: [
      { name: "label", label: "Label", type: "string", default: "Button" },
      {
        name: "variant",
        label: "Variant",
        type: "select",
        default: "primary",
        options: [
          { label: "Primary", value: "primary" },
          { label: "Secondary", value: "secondary" },
          { label: "Outline", value: "outline" },
          { label: "Ghost", value: "ghost" },
          { label: "Danger", value: "danger" },
        ],
      },
      {
        name: "size",
        label: "Size",
        type: "select",
        default: "md",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
        ],
      },
      { name: "disabled", label: "Disabled", type: "boolean", default: false },
    ],
  },
  {
    type: "UiBadge",
    name: "Badge",
    icon: "🏷️",
    category: "ui",
    defaultProps: {
      label: "Badge",
      variant: "default",
    },
    propsSchema: [
      { name: "label", label: "Label", type: "string", default: "Badge" },
      {
        name: "variant",
        label: "Variant",
        type: "select",
        default: "default",
        options: [
          { label: "Default", value: "default" },
          { label: "Primary", value: "primary" },
          { label: "Success", value: "success" },
          { label: "Warning", value: "warning" },
          { label: "Danger", value: "danger" },
        ],
      },
    ],
  },
  {
    type: "UiCard",
    name: "Card",
    icon: "📦",
    category: "ui",
    defaultProps: {
      title: "Card Title",
      content: "Card content goes here...",
      showHeader: true,
      showFooter: false,
      footerText: "",
    },
    propsSchema: [
      { name: "title", label: "Title", type: "string", default: "Card Title" },
      {
        name: "content",
        label: "Content",
        type: "string",
        default: "Card content goes here...",
      },
      {
        name: "showHeader",
        label: "Show Header",
        type: "boolean",
        default: true,
      },
      {
        name: "showFooter",
        label: "Show Footer",
        type: "boolean",
        default: false,
      },
      { name: "footerText", label: "Footer Text", type: "string", default: "" },
    ],
  },
  {
    type: "UiInput",
    name: "Input",
    icon: "📝",
    category: "ui",
    defaultProps: {
      label: "Input Label",
      placeholder: "Enter text...",
      type: "text",
      disabled: false,
      required: false,
    },
    propsSchema: [
      { name: "label", label: "Label", type: "string", default: "Input Label" },
      {
        name: "placeholder",
        label: "Placeholder",
        type: "string",
        default: "Enter text...",
      },
      {
        name: "type",
        label: "Type",
        type: "select",
        default: "text",
        options: [
          { label: "Text", value: "text" },
          { label: "Email", value: "email" },
          { label: "Password", value: "password" },
          { label: "Number", value: "number" },
          { label: "Tel", value: "tel" },
        ],
      },
      { name: "disabled", label: "Disabled", type: "boolean", default: false },
      { name: "required", label: "Required", type: "boolean", default: false },
    ],
  },
  {
    type: "UiAlert",
    name: "Alert",
    icon: "⚠️",
    category: "ui",
    defaultProps: {
      title: "Alert Title",
      message: "This is an alert message.",
      variant: "info",
      dismissible: true,
    },
    propsSchema: [
      { name: "title", label: "Title", type: "string", default: "Alert Title" },
      {
        name: "message",
        label: "Message",
        type: "string",
        default: "This is an alert message.",
      },
      {
        name: "variant",
        label: "Variant",
        type: "select",
        default: "info",
        options: [
          { label: "Info", value: "info" },
          { label: "Success", value: "success" },
          { label: "Warning", value: "warning" },
          { label: "Error", value: "error" },
        ],
      },
      {
        name: "dismissible",
        label: "Dismissible",
        type: "boolean",
        default: true,
      },
    ],
  },
  {
    type: "UiProgress",
    name: "Progress Bar",
    icon: "📊",
    category: "ui",
    defaultProps: {
      value: 50,
      max: 100,
      label: "",
      showLabel: true,
      variant: "primary",
      size: "md",
    },
    propsSchema: [
      {
        name: "value",
        label: "Value",
        type: "number",
        default: 50,
      },
      {
        name: "max",
        label: "Maximum",
        type: "number",
        default: 100,
      },
      {
        name: "label",
        label: "Label",
        type: "string",
        default: "",
      },
      {
        name: "showLabel",
        label: "Show Label",
        type: "boolean",
        default: true,
      },
      {
        name: "variant",
        label: "Variant",
        type: "select",
        default: "primary",
        options: [
          { label: "Primary", value: "primary" },
          { label: "Success", value: "success" },
          { label: "Warning", value: "warning" },
          { label: "Error", value: "error" },
        ],
      },
      {
        name: "size",
        label: "Size",
        type: "select",
        default: "md",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
        ],
      },
    ],
  },
  {
    type: "UiTabs",
    name: "Tabs",
    icon: "📑",
    category: "ui",
    defaultProps: {
      tabs: JSON.stringify(["Tab 1", "Tab 2", "Tab 3"]),
      contents: JSON.stringify([
        "Content for tab 1",
        "Content for tab 2",
        "Content for tab 3",
      ]),
      defaultTab: 0,
      variant: "underline",
    },
    propsSchema: [
      {
        name: "tabs",
        label: "Tab Labels (comma-separated)",
        type: "string",
        default: "Tab 1,Tab 2,Tab 3",
      },
      {
        name: "contents",
        label: "Tab Contents (comma-separated)",
        type: "string",
        default: "Content for tab 1,Content for tab 2,Content for tab 3",
      },
      {
        name: "defaultTab",
        label: "Default Active Tab",
        type: "number",
        default: 0,
      },
      {
        name: "variant",
        label: "Variant",
        type: "select",
        default: "underline",
        options: [
          { label: "Underline", value: "underline" },
          { label: "Pills", value: "pills" },
          { label: "Bordered", value: "bordered" },
        ],
      },
    ],
  },
  {
    type: "UiAccordion",
    name: "Accordion",
    icon: "📋",
    category: "ui",
    defaultProps: {
      items: JSON.stringify([
        { title: "Question 1", content: "Answer to question 1" },
        { title: "Question 2", content: "Answer to question 2" },
        { title: "Question 3", content: "Answer to question 3" },
      ]),
      allowMultiple: false,
      defaultOpen: 0,
    },
    propsSchema: [
      {
        name: "items",
        label: "Items (JSON format)",
        type: "string",
        default: JSON.stringify([
          { title: "Question 1", content: "Answer to question 1" },
          { title: "Question 2", content: "Answer to question 2" },
        ]),
      },
      {
        name: "allowMultiple",
        label: "Allow Multiple Open",
        type: "boolean",
        default: false,
      },
      {
        name: "defaultOpen",
        label: "Default Open Index",
        type: "number",
        default: 0,
      },
    ],
  },
  {
    type: "UiTooltip",
    name: "Tooltip",
    icon: "💬",
    category: "ui",
    defaultProps: {
      text: "Hover over me",
      tooltip: "This is a tooltip",
      position: "top",
    },
    propsSchema: [
      {
        name: "text",
        label: "Text",
        type: "string",
        default: "Hover over me",
      },
      {
        name: "tooltip",
        label: "Tooltip Content",
        type: "string",
        default: "This is a tooltip",
      },
      {
        name: "position",
        label: "Position",
        type: "select",
        default: "top",
        options: [
          { label: "Top", value: "top" },
          { label: "Bottom", value: "bottom" },
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
    ],
  },
  {
    type: "UiModal",
    name: "Modal",
    icon: "🪟",
    category: "ui",
    defaultProps: {
      buttonText: "Open Modal",
      title: "Modal Title",
      content: "This is the modal content.",
      confirmText: "Confirm",
      cancelText: "Cancel",
      size: "md",
    },
    propsSchema: [
      {
        name: "buttonText",
        label: "Button Text",
        type: "string",
        default: "Open Modal",
      },
      {
        name: "title",
        label: "Modal Title",
        type: "string",
        default: "Modal Title",
      },
      {
        name: "content",
        label: "Modal Content",
        type: "string",
        default: "This is the modal content.",
      },
      {
        name: "confirmText",
        label: "Confirm Button Text",
        type: "string",
        default: "Confirm",
      },
      {
        name: "cancelText",
        label: "Cancel Button Text",
        type: "string",
        default: "Cancel",
      },
      {
        name: "size",
        label: "Size",
        type: "select",
        default: "md",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
          { label: "Extra Large", value: "xl" },
        ],
      },
    ],
  },
  {
    type: "UiCheckbox",
    name: "Checkbox",
    icon: "☑️",
    category: "ui",
    defaultProps: {
      label: "Checkbox Label",
      checked: false,
      disabled: false,
    },
    propsSchema: [
      {
        name: "label",
        label: "Label",
        type: "string",
        default: "Checkbox Label",
      },
      {
        name: "checked",
        label: "Checked",
        type: "boolean",
        default: false,
      },
      {
        name: "disabled",
        label: "Disabled",
        type: "boolean",
        default: false,
      },
    ],
  },
  {
    type: "UiSelect",
    name: "Select Dropdown",
    icon: "🔽",
    category: "ui",
    defaultProps: {
      label: "Select Option",
      options: JSON.stringify(["Option 1", "Option 2", "Option 3"]),
      placeholder: "Choose an option...",
      disabled: false,
    },
    propsSchema: [
      {
        name: "label",
        label: "Label",
        type: "string",
        default: "Select Option",
      },
      {
        name: "options",
        label: "Options (comma-separated)",
        type: "string",
        default: "Option 1,Option 2,Option 3",
      },
      {
        name: "placeholder",
        label: "Placeholder",
        type: "string",
        default: "Choose an option...",
      },
      {
        name: "disabled",
        label: "Disabled",
        type: "boolean",
        default: false,
      },
    ],
  },
  {
    type: "UiDivider",
    name: "Divider",
    icon: "➖",
    category: "ui",
    defaultProps: {
      text: "",
      variant: "solid",
      spacing: "md",
    },
    propsSchema: [
      {
        name: "text",
        label: "Text (optional)",
        type: "string",
        default: "",
      },
      {
        name: "variant",
        label: "Variant",
        type: "select",
        default: "solid",
        options: [
          { label: "Solid", value: "solid" },
          { label: "Dashed", value: "dashed" },
          { label: "Dotted", value: "dotted" },
        ],
      },
      {
        name: "spacing",
        label: "Spacing",
        type: "select",
        default: "md",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
        ],
      },
    ],
  },

  // ============== LAYOUT COMPONENTS ==============
  {
    type: "UiGrid",
    name: "Grid Layout (Nestable)",
    icon: "🔲",
    category: "layout",
    defaultProps: {
      columns: 2,
      gap: "4",
      columnWidths: [1, 1],
      cells: [],
    },
    propsSchema: [
      {
        name: "columns",
        label: "Columns",
        type: "select",
        default: 2,
        options: [
          { label: "1 Column", value: 1 },
          { label: "2 Columns", value: 2 },
          { label: "3 Columns", value: 3 },
          { label: "4 Columns", value: 4 },
          { label: "5 Columns", value: 5 },
          { label: "6 Columns", value: 6 },
        ],
      },
      {
        name: "gap",
        label: "Gap",
        type: "select",
        default: "4",
        options: [
          { label: "None", value: "0" },
          { label: "Small", value: "2" },
          { label: "Medium", value: "4" },
          { label: "Large", value: "6" },
          { label: "Extra Large", value: "8" },
        ],
      },
    ],
  },
]

// Initialize default components
defaultComponents.forEach((comp) => componentDefinitions.set(comp.type, comp))

export function useComponentRegistry() {
  const registerComponent = (definition: ComponentDefinition) => {
    componentDefinitions.set(definition.type, definition)
  }

  const unregisterComponent = (type: string) => {
    componentDefinitions.delete(type)
  }

  const getComponent = (type: string): ComponentDefinition | undefined => {
    return componentDefinitions.get(type)
  }

  const getAllComponents = (): ComponentDefinition[] => {
    return Array.from(componentDefinitions.values())
  }

  const getComponentsByCategory = (category: string): ComponentDefinition[] => {
    return getAllComponents().filter((c) => c.category === category)
  }

  const getCategories = (): string[] => {
    // Return categories in specific order
    const orderedCategories = [
      "layout",
      "hero",
      "header",
      "footer",
      "content",
      "ui",
    ]
    const allCategories = new Set(getAllComponents().map((c) => c.category))
    return orderedCategories.filter((c) => allCategories.has(c))
  }

  return {
    registerComponent,
    unregisterComponent,
    getComponent,
    getAllComponents,
    getComponentsByCategory,
    getCategories,
  }
}
