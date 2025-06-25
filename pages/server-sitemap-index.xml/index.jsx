// pages/server-sitemap-index.xml/index.tsx
import { db } from "@/firebase"
import { getServerSideSitemapIndexLegacy } from "next-sitemap"

export const getServerSideProps = async ctx => {

  const res = await db.collection("package").get()
  const entry = res.docs.map((entry) =>{
      return (entry.data().slug)
  } );
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
console.log(entry)
  return getServerSideSitemapIndexLegacy(ctx, entry)
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
