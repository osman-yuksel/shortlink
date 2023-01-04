import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("middleware???", req.nextUrl.pathname);
  const slug = req.nextUrl.pathname.split("/").pop();
  console.log("slug???", slug);
 
  //for logo to load.
  if (slug === "logo.png")
    return;
  
  const linkFetch = await fetch(`${req.nextUrl.origin}/api/getlink/${slug}`);
  if (linkFetch.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin);
  }
  const data = await linkFetch.json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}

export const config = {
  matcher: "/:path/:path", //idk why this works properly instead of /:path
};
