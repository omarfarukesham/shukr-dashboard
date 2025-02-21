
export default function About() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-5">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        About Me
      </h2>

      {/* About Content */}
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        {/* Personal Summary */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            I am a dedicated professional...
          </h3>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            With a Bachelor’s degree in Computer Science and Engineering, majoring in Software Engineering, I’ve developed a diverse skill set over the years. My career spans IT support, web development, software testing, and digital marketing. I combine technical expertise with creativity to deliver solutions that are both functional and visually compelling.
          </p>
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Education
          </h4>
          <ul className="mt-4 text-gray-700 dark:text-gray-300">
            <li>
              <strong>B.Sc. in Computer Science and Engineering</strong>
            </li>
            <li>Major: Software Engineering</li>
            <li>Institution: [University Name]</li>
            <li>Graduation Year: [Year]</li>
          </ul>
        </div>

        {/* Professional Experience Section */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Professional Experience
          </h4>
          <div className="mt-4 text-gray-700 dark:text-gray-300">
            <div className="mb-4">
              <strong>IT Technical Support Engineer</strong>
              <p>
                Providing advanced technical support, network troubleshooting, and system optimization for businesses to ensure smooth and secure IT operations.
              </p>
            </div>
            <div className="mb-4">
              <strong>Digital Marketing Specialist</strong>
              <p>
                Creating and executing marketing strategies, including social media campaigns and SEO, to drive engagement and measurable growth.
              </p>
            </div>
            <div className="mb-4">
              <strong>Web Developer</strong>
              <p>
                Designing and developing responsive websites, including e-commerce platforms, landing pages, and corporate websites that enhance user experience.
              </p>
            </div>
            <div>
              <strong>Software Testing Specialist</strong>
              <p>
                Performing manual and automated testing to ensure application functionality, security, and performance across platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Thesis Section */}
        <div>
          <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Thesis
          </h4>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            <strong>Title:</strong> [Insert Thesis Title]
          </p>
          <p className="mt-2">
            My thesis explored [briefly describe the focus], presenting cutting-edge solutions in [specific field]. It addressed critical challenges in [related area] and provided insights into [key technologies or methodologies].
          </p>
        </div>
      </div>
    </div>
  );
}
