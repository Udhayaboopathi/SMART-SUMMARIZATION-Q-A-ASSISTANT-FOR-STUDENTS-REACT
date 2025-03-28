import React from "react";

const ContentDisplay = ({ summary }) => {
  if (!summary) return null;

  // Destructure the summary object
  const { title, language, summary: summaryData, links } = summary;
  const {
    overview,
    key_points,
    technical_terms,
    examples,
    further_reading,
    recommended_videos,
  } = summaryData;

  return (
    <div className="mt-6 p-6 rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-2">
        <strong>Language:</strong> {language}
      </p>

      {/* Overview */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Overview</h3>
        <p>{overview}</p>
      </div>

      {/* Key Points */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Key Points</h3>
        <ul className="list-disc pl-6">
          {key_points?.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Technical Terms */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Technical Terms</h3>
        <ul>
          {technical_terms &&
            Object.entries(technical_terms).map(
              ([term, description], index) => (
                <li key={index}>
                  <strong>{term}:</strong> {description}
                </li>
              )
            )}
        </ul>
      </div>

      {/* Examples */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Examples</h3>
        {examples?.map((example, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-lg font-medium">{example.concept}</h4>
            <p>{example.example}</p>
          </div>
        ))}
      </div>

      {/* Further Reading */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Further Reading</h3>
        {further_reading?.map((item, index) => (
          <div key={index} className="mb-2">
            <a
              href={item.link}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.title} by {item.author}
            </a>
          </div>
        ))}
      </div>

      {/* Recommended Videos */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Recommended Videos</h3>
        {recommended_videos?.map((video, index) => (
          <div key={index} className="mb-2">
            <a
              href={video.link}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {video.title} by {video.channel}
            </a>
          </div>
        ))}
      </div>

      {/* Links Section (if any) */}
      {links && Object.entries(links).length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Links</h3>
          <ul>
            {Object.entries(links).map(([linkTitle, linkUrls], index) => (
              <li key={index}>
                <span className="font-semibold">{linkTitle}:</span>
                <ul>
                  {linkUrls.map((linkUrl, subIndex) => (
                    <li key={subIndex}>
                      <a
                        href={linkUrl}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {linkUrl}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;
