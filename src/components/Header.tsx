import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  return (
    <header className="py-6 border-b dark:border-gray-700">
      <div className="container mx-auto flex justify-center items-center px-4">
        <nav className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Blog
          </Link>
          <Link
            href="/projects"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Projects
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
