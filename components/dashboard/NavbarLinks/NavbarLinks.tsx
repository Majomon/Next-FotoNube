"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface LinkItem {
  href: string;
  text: string;
}

interface NavbarLinksProps {
  links: LinkItem[];
  containerClassName?: string;
}

export function NavbarLinks({
  links,
  containerClassName = "",
}: NavbarLinksProps) {
  return (
    <nav className={containerClassName}>
      <ul className="flex gap-6">
        {links.map(({ href, text }) => (
          <motion.li
            key={href}
            whileHover={{ y: -3, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="cursor-pointer"
          >
            <Link href={href} className="btn-navbar">
              {text}
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
