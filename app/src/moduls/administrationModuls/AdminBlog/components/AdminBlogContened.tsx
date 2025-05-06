import React from "react";
import BlogComponent from "../../../../components/BlogComponent";
import ReadMoreLink from "../../../Blog/components/ReadMoreLink";
import EditButtonSection from "../../../../components/administrationComponents/EditButtonSection";

type Props = {};

export default function AdminBlogContened({}: Props) {
  return (
    <div className="grid grid-cols-3 grid-flow-row max-lg:grid-cols-1">
      <BlogComponent>
        <EditButtonSection
          onClick={() => console.log("hola")}
          onDelete={() => console.log("hola")}
        />
      </BlogComponent>
      <BlogComponent>
        <EditButtonSection
          onClick={() => console.log("hola")}
          onDelete={() => console.log("hola")}
        />
      </BlogComponent>
      <BlogComponent>
        <EditButtonSection
          onClick={() => console.log("hola")}
          onDelete={() => console.log("hola")}
        />
      </BlogComponent>
    </div>
  );
}
