import React from "react";
import CreateNewBlogPost from "./CreateNewBlogPost";
import ListMapBlogPosts from "./ListMapBlogPosts";

type Props = {};

export default function AdminBlogContened({}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-lettersDark">Administrar Blog</h1>
        <CreateNewBlogPost />
      </div>
      
      <ListMapBlogPosts />
    </div>
  );
}
