import { RouteComponentProps } from '@reach/router';
import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface Auth0Roles {
  id: string;
  name: string;
  description: string;
}

export interface ApiResponse {
  created_at: string;
  email: string;
  email_verified: boolean;
  identities: {
    provider: string;
    user_id: string;
    isSocial: boolean;
    connection: string;
  }[];
  name: string;
  nickname?: string;
  picture?: string;
  updated_at?: string;
  user_id: string;
  roles: string[];
  user_metadata?: {
    subscribeToEmails: boolean;
  };
}

export interface ApiResponseAllData {
  error?: string;
  body: {
    user: ApiResponse;
    status_code: number;
    status_description: string;
  };
}

export interface FormData {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
  roles: string[];
  user_metadata: {
    subscribeToEmails?: boolean;
  };
}

export interface IArticleProps {
  mainImage:
    | {
        readonly gatsbyImageData: Record<string, unknown> | null;
        readonly title: string | null;
        readonly description: string | null;
        readonly file: { readonly url: string | null } | null;
      }
    | null
    | undefined;
  title: string | null | undefined;
  author?:
    | readonly ({
        readonly firstName: string | null;
        readonly lastName: string | null;
      } | null)[]
    | null
    | undefined;
  bodyText: any;
  createdAt: string | null | undefined;
  updatedAt: string | null | undefined;
  buttonLink: string;
}

export interface IAllPrivatePosts {
  posts: {
    items: {
      sys: {
        id: string;
        createdAt: string;
        updatedAt: string;
      } | null;
      title: string;
      slug: string;
      excerpt: string;
      featuredImage: {
        url: string;
        title?: string;
        description?: string;
      };
    }[];
  };
}

export interface IArticleGrid {
  contentful_id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  excerpt: {
    excerpt: string;
  };
  author: {
    firstName: string;
    lastName: string;
  }[];
  featuredImage: {
    gatsbyImageData: IGatsbyImageData;
    description: string;
    title: string;
  };
}

export interface IBlogArchive {
  currentPage: number;
  limit: number;
  numPages: number;
  skip: number;
}

export interface IContentfulBlogPost {
  data: {
    contentfulBlogPost: {
      title: string;
      createdAt: string;
      updatedAt: string;
      author: {
        firstName: string;
        lastName: string;
      }[];
      bodyText: {
        raw: string;
      };
      excerpt: {
        excerpt: string;
      };
      featuredImage: {
        description: string;
        title: string;
        file: {
          url: string;
        };
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
  errors: any;
}

export interface IContentfulSide {
  data: {
    contentfulSide: {
      pageTitle: string;
      createdAt: string;
      updatedAt: string;
      pageText: {
        raw: string;
      };
      excerpt: any;
      title: string;
      bodyText: {
        raw: string;
      };
      pageImage: {
        description: string;
        title: string;
        file: {
          url: string;
        };
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
  errors: any;
}

export interface ICustomImageProps {
  url: string;
  alt: string;
  aspectRatio?: number | undefined;
}

export interface IDocumentLibrary {
  content: {
    fileName: string;
    title: string;
    url: string;
    sys: {
      id: string;
      firstPublishedAt: string;
      publishedAt: string;
    };
  }[];
  size?: 'lg' | 'md' | 'sm';
  hasDeleteAccess?: boolean;
}

export interface IDokumenter {
  title: string;
  excerpt: string;
  props: {
    path: string;
    uri: string;
    children?: React.ReactNode;
    navigate?: any;
    location?: any;
  };
}

export interface iErrorPageProps {
  errorTitle?: string;
  errorMsg?: string;
  backButton?: boolean;
  backButtonLabel?: string;
  backButtonLink?: string;
}

export interface IHeroWide {
  contentful_id: string;
  pageTitle: string;
  excerpt: {
    excerpt: string;
  };
  pageImage: {
    url: string;
    gatsbyImageData: IGatsbyImageData;
    title: string;
    description: string;
  };
}

export interface ILoadingSpinner {
  spinnerMessage?: string;
}

export interface IMenuButton {
  multiLink?: boolean;
  children: React.ReactNode;
  linkTo?: string;
  to?: string;
}

export interface IPrivateroute {
  component: any;
  location?: string;
  path: string;
  postData?: any;
  title?: string;
  excerpt?: string;
}

export interface MenuItemsProps {
  to: string;
  children: string;
  isLast?: boolean;
}

export interface INoAccess {
  errorTitle?: string;
  errorMsg?: string;
}
export interface INotLoggedIn {
  title?: string;
  description?: string;
  redirectUser?: string;
}

export interface PreviewBlogProps extends RouteComponentProps {
  id?: string;
  path: string;
}

export interface PreviewPageProps extends RouteComponentProps {
  id?: string;
  path: string;
}

export interface IReferater {
  title: string;
  excerpt: string;
  props: {
    path: string;
    uri: string;
    children?: React.ReactNode;
    navigate?: any;
    location?: any;
  };
}

export interface ISEOProps {
  title?: string | null;
  description?: string | null;
  lang?: string;
  meta?: Array<{ name: string; content: string }>;
  image?: string | null;
}

export interface IServiceBoxQuery {
  menuItems: {
    id: string;
    menu1: string;
    menu1File: {
      file: {
        url: string;
      };
    };
    menu2: string;
    menu2File: {
      file: {
        url: string;
      };
    };
    menu3: string;
    menu3File: {
      file: {
        url: string;
      };
    };
    menu4: string;
    menu4File: {
      file: {
        url: string;
      };
    };
    menu5: string;
    menu6: string;
  };
}

export interface IQueryDataTypes {
  site: {
    siteMetadata: {
      defaultDescription: string;
      defaultTitle: string;
      siteLanguage: string;
      defaultImage: string;
      siteUrl: string;
    };
  };
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface PrivateArticleProps {
  mainImage: {
    title: string;
    description: string;
    url: string;
  };
  title: string;
  author?: {
    firstName: string;
    lastName: string;
  }[];
  bodyText: any;
  createdAt: string;
  updatedAt: string;
  buttonLink: string;
}

export interface ShowSingleFileFromDocumentLibraryProps {
  file: {
    fileName: string;
    title: string;
    url: string;
    description: string;
    sys: {
      id: string;
      firstPublishedAt: string;
      publishedAt: string;
    };
  };
  size?: 'lg' | 'md' | 'sm';
}

export interface UserData {
  created_at: string;
  last_login?: string;
  email: string;
  name: string;
  picture?: string;
  roles: string[];
  user_id: string;
  user_metadata: {
    subscribeToEmails: boolean;
  };
}
