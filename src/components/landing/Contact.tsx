import React from "react";

export default function Contact() {
  return (
    <div
      className="mx-2 mt-16 grid items-center overflow-hidden rounded-lg border-4 border-yellow-400 font-[sans-serif] shadow-2xl md:mx-16 md:grid-cols-2"
      id="contact"
    >
      <div className="bg-gray-900 p-8">
        <h2 className="text-3xl font-bold text-white">
          Get In <span className="text-yellow-400">Touch</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-300">
          Have a specific inquiry or looking to explore new opportunities? Our
          experienced team is ready to engage with you.
        </p>

        <form>
          <div className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border-b border-gray-400 bg-transparent px-2 py-3 text-sm text-gray-300 outline-none focus:border-yellow-400"
            />
            <input
              type="text"
              placeholder="Street"
              className="w-full border-b border-gray-400 bg-transparent px-2 py-3 text-sm text-gray-300 outline-none focus:border-yellow-400"
            />
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="City"
                className="w-full border-b border-gray-400 bg-transparent px-2 py-3 text-sm text-gray-300 outline-none focus:border-yellow-400"
              />

              <input
                type="text"
                placeholder="Postcode"
                className="w-full border-b border-gray-400 bg-transparent px-2 py-3 text-sm text-gray-300 outline-none focus:border-yellow-400"
              />
            </div>
            <input
              type="number"
              placeholder="Phone No."
              className="w-full border-b border-gray-400 bg-transparent px-2 py-3 text-sm text-gray-300 outline-none focus:border-yellow-400"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-gray-400 bg-transparent px-2 py-3 text-sm text-gray-300 outline-none focus:border-yellow-400"
            />

            <textarea
              placeholder="Write Message"
              className="w-full border-b border-gray-400 bg-transparent px-2 pt-3 text-sm text-gray-300 outline-none focus:border-yellow-400"
            ></textarea>
          </div>

          <button
            type="button"
            className="mt-8 flex w-full items-center justify-center rounded-md bg-yellow-400 px-6 py-3 text-sm tracking-wide text-gray-800 hover:bg-yellow-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              fill="currectColor"
              className="mr-2"
              viewBox="0 0 548.244 548.244"
            >
              <path
                fill-rule="evenodd"
                d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                clip-rule="evenodd"
                data-original="#000000"
              />
            </svg>
            Send Message
          </button>
        </form>

        <ul className="mt-4 flex flex-wrap justify-center gap-4 max-lg:flex-col max-lg:items-center max-lg:space-y-2 lg:space-x-6">
          <li className="flex items-center text-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              fill="currentColor"
              viewBox="0 0 479.058 479.058"
            >
              <path
                d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                data-original="#000000"
              />
            </svg>
            <a
              href="mailto:info@taskercompany.com"
              className="ml-3 text-sm text-current"
            >
              info@taskercompany.com
            </a>
          </li>
          <li className="flex items-center text-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              fill="currentColor"
              viewBox="0 0 482.6 482.6"
            >
              <path
                d="M98.339 320.8c47.6 56.9 104.9 101.7 170.3 133.4 24.9 11.8 58.2 25.8 95.3 28.2 2.3.1 4.5.2 6.8.2 24.9 0 44.9-8.6 61.2-26.3.1-.1.3-.3.4-.5 5.8-7 12.4-13.3 19.3-20 4.7-4.5 9.5-9.2 14.1-14 21.3-22.2 21.3-50.4-.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2-12.8 0-25.1 5.6-35.6 16.1l-35.8 35.8c-3.3-1.9-6.7-3.6-9.9-5.2-4-2-7.7-3.9-11-6-32.6-20.7-62.2-47.7-90.5-82.4-14.3-18.1-23.9-33.3-30.6-48.8 9.4-8.5 18.2-17.4 26.7-26.1 3-3.1 6.1-6.2 9.2-9.3 10.8-10.8 16.6-23.3 16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4-6.6-6.8-13.5-13.8-20.3-20.1-10.3-10.1-22.4-15.4-35.2-15.4-12.7 0-24.9 5.3-35.6 15.5l-37.4 37.4c-13.6 13.6-21.3 30.1-22.9 49.2-1.9 23.9 2.5 49.3 13.9 80 17.5 47.5 43.9 91.6 83.1 138.7zm-72.6-216.6c1.2-13.3 6.3-24.4 15.9-34l37.2-37.2c5.8-5.6 12.2-8.5 18.4-8.5 6.1 0 12.3 2.9 18 8.7 6.7 6.2 13 12.7 19.8 19.6 3.4 3.5 6.9 7 10.4 10.6l29.8 29.8c6.2 6.2 9.4 12.5 9.4 18.7s-3.2 12.5-9.4 18.7c-3.1 3.1-6.2 6.3-9.3 9.4-9.3 9.4-18 18.3-27.6 26.8l-.5.5c-8.3 8.3-7 16.2-5 22.2.1.3.2.5.3.8 7.7 18.5 18.4 36.1 35.1 57.1 30 37 61.6 65.7 96.4 87.8 4.3 2.8 8.9 5 13.2 7.2 4 2 7.7 3.9 11 6 .4.2.7.4 1.1.6 3.3 1.7 6.5 2.5 9.7 2.5 8 0 13.2-5.1 14.9-6.8l37.4-37.4c5.8-5.8 12.1-8.9 18.3-8.9 7.6 0 13.8 4.7 17.7 8.9l60.3 60.2c12 12 11.9 25-.3 37.7-4.2 4.5-8.6 8.8-13.3 13.3-7 6.8-14.3 13.8-20.9 21.7-11.5 12.4-25.2 18.2-42.9 18.2-1.7 0-3.5-.1-5.2-.2-32.8-2.1-63.3-14.9-86.2-25.8-62.2-30.1-116.8-72.8-162.1-127-37.3-44.9-62.4-86.7-79-131.5-10.3-27.5-14.2-49.6-12.6-69.7z"
                data-original="#000000"
              ></path>
            </svg>
            <a href="tel:+923025117000" className="ml-3 text-sm text-current">
              +92 302-5117000
            </a>
          </li>
        </ul>
      </div>

      <div className="relative z-10 h-full max-md:min-h-[350px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.306122906375!2d74.37613237435502!3d31.48826844872965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919054d6a8a206b%3A0xc0306370ab6aa38!2sFast%20Cool%20Engineering%20by%20AL%20Majeed%20Group%20(DHA)!5e0!3m2!1sen!2s!4v1733477379472!5m2!1sen!2s"
          className="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-bl-lg lg:rounded-tr-none"
        ></iframe>
      </div>
    </div>
  );
}
