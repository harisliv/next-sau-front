import { NextPage } from "next";
import { useRouter } from "next/router";
import ArticleList from "../../components/articles/ArticleList";
import { CategoryValues } from "../../types/types";

const ArticlesByCategoryGrid: NextPage = () => {
  const categories = ["economy", "sports", "lifestyle"] as const;
  const router = useRouter();
  const { categoryName } = router.query;

  function isCategory(category: any): category is CategoryValues {
    return categories.includes(category);
  }
  
  let content = null;
  if (isCategory(categoryName)) {
    content = <ArticleList categories={categoryName} />;
  } else {
    content = <p>Category does not exist</p>;
  }
  return (
    content
  )
};

// export async function getStaticPaths() {
//     const response = await fetch("http://localhost/api/categories");
//       if (!response.ok) {
//         throw new Error("Something went wrong!");
//       }
//       const data = await response.json();
//       const fetchedCategories = data.map((category: Category) => {
//         return {
//           id: category.id,
//           name: category.name,
//         };
//       });
//     return {
//         fallback: "blocking",
//         paths: fetchedCategories.map((item: Category) => ({
//             params: {categoryName: item.name}
//         }))
//     }
// }

export default ArticlesByCategoryGrid;
