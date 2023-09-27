import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useRouter } from "next/router";
import Head from "next/head";

interface EmailVerify {
  email?: string;
  message?: string;
}

function MainLayout({ email, message }: EmailVerify) {
  const router = useRouter();
  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required*"),
  });

  const checkSingleEmail = async (email: string | undefined) => {
    if (email !== router.query.email) {
      router.push(`?email=${email}`);
    }
  };

  return (
    <>
      <Head>
        <title>Authemailsolution</title>
        <meta
          name="description"
          content="Enhance Email Security and Brand Reputation with Our Authentic
          Mail Solutions. Our advanced email scrubbing services help you maintain a clean inbox by verifying, cleaning, and validating your email lists. Say goodbye to bounced emails and improve your email deliverability today."
        />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-4xl text-gray-900">
              Enhance Email Security and Brand Reputation with Our Authentic
              Mail Solutions.
            </h1>
            <p className="leading-relaxed font-medium mt-4">
              We offer robust email verification services that ensure By Our
              advanced email scrubbing services help you maintain a clean inbox
              by verifying, cleaning, and validating your email lists. Say
              goodbye to bounced emails and improve your email deliverability
              today.
            </p>
          </div>

          <Formik
            initialValues={{ email: email }}
            validationSchema={emailValidationSchema}
            onSubmit={(values) => {
              checkSingleEmail(values.email);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
              /* and other goodies */
            }) => (
              <form
                onSubmit={handleSubmit}
                className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
              >
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                  Check email for free!
                </h2>

                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="search"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="youremail@gmail.com"
                    className={`w-full bg-white rounded border border-gray-300 focus:ring-2  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${
                      errors.email
                        ? "focus:border-red-700 focus:ring-red-200"
                        : "focus:border-indigo-500 focus:ring-indigo-200"
                    }`}
                  />
                </div>

                {errors.email && touched.email && (
                  <span className="-mt-3 text-right text-red-600 text-sm font-medium">
                    {errors.email}
                  </span>
                )}

                <button
                  type="submit"
                  disabled={!isValid}
                  className="text-white mt-2 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded font-medium"
                >
                  Submit
                </button>

                {message && message !== "" && (
                  <div className="p-2 w-full">
                    <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                      {!message.includes("invalid") ? (
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          className="text-green-500 w-6 h-6 flex-shrink-0 mr-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                          <path d="M22 4L12 14.01l-3-3"></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                          stroke="currentColor"
                          className="text-red-500 w-6 h-6 flex-shrink-0 mr-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}

                      <span className="title-font font-medium">{message}</span>
                    </div>
                  </div>
                )}
              </form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}

export default MainLayout;
