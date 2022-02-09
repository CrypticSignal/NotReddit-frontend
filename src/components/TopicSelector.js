import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../apiRequests";

const TopicSelector = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchTopics() {
      const topics = await getTopics();
      setTopics(topics);
    }
    fetchTopics();
  }, []);

  return (
    <nav id="topicsNav">
      {topics.map((topic) => {
        return (
          <Link key={topic.slug} to={`/topics/${topic.slug}`}>
            {topic.slug}
          </Link>
        );
      })}
      <Link to={"/"}>All</Link>
    </nav>
  );
};

export default TopicSelector;
