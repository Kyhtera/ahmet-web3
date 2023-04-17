import Link from "next/link";
import BlogCardData from "../../../pages/api/blog-data";

const Blog = () => {
  return (
    <section className="blog main-section flex-column-mobile" id="blog">
      {/* TITLE STARTS */}
      <div className="custom-title">
        {/* MAIN TITLE STARTS */}
        <h3>
          <span>
            <span className="animated-layer fade-in-left-animation fadeInUp wow">
              Web3 Blog
            </span>
          </span>
        </h3>
        {/* MAIN TITLE ENDS */}
      </div>
      {/* TITLE ENDS */}
      {/* LATEST POSTS STARTS */}
      <div className="latestposts flex-column-mobile">
        {/* POST ITEM STARTS */}
        {BlogCardData.slice(0, 3).map((card) => (
          <div className="animated-layer fade-in-right-animation fadeInUp wow">
            <Link href="/blog-post" legacyBehavior>
              <a>
                <span className="img-holder">
                  <img src={card.imageUrl} alt={card.title} />
                </span>
                <div className="content">
                  <span className="category">{card.category}</span>
                  <span className="title">
                    {card.title}
                  </span>
                  <p>
                    {card.abstract}
                  </p>
                  <div className="meta d-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="fa-regular fa-calendar" />
                      <span>{card.date}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="fa-regular fa-comments" />
                      <span>{card.commentcount}</span>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
      {/* LATEST POSTS ENDS */}
    </section>
  );
};
export default Blog;
