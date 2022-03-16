import { FormEvent, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import pools from "../../pools.json";
import { UseGitHub } from "../../hooks/useGithub";

export const ReportPage = () => {
  const [pool, setPool] = useState("");
  const [cause, setCause] = useState("");
  const [poolError, setPoolError] = useState("");
  const [success, setSuccess] = useState("");

  const { reportPool } = UseGitHub();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    reportPool(pool, cause)
      .then(_ => {
        setSuccess("Your request has been sent to the app maintainer.");
      })
      .catch(() => {
        setPoolError("An error occured, please retry later.");
      });
  };

  const isInvalid = () => {
    return !(pool && cause);
  };

  return (
    <AppLayout
      title="Conflux PoS Validators / Pools : Report a pool"
      desc="Find the best Pool / Validator to stake your CFX token on Conflux Network"
    >
      {success || poolError ? (
        <div className="w-full max-w-2xl px-5 py-10 m-auto mt-10 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className={`${success ? "text-green-600" : "text-red-600"}`}>
            {success || poolError}
          </p>
        </div>
      ) : (
        <form
          className="flex w-full max-w-lg mx-auto space-x-3"
          onSubmit={e => submit(e)}
          noValidate
        >
          <div className="w-full max-w-2xl px-5 py-10 m-auto mt-10 bg-white rounded-lg shadow dark:bg-gray-800">
            <h1 className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
              Report a pool
            </h1>
            <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
              <div className="col-span-2 lg:col-span-1">
                <div className="relative ">
                  <select
                    className="block px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    name="animals"
                    onChange={e => setPool(e.target.value)}
                  >
                    <option value="">Select a pool</option>
                    {pools.map(pool => {
                      return <option value={pool.link}>{pool.name}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="col-span-2">
                <label className="text-gray-700" htmlFor="name">
                  <textarea
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    id="comment"
                    placeholder="Cause"
                    value={cause}
                    onChange={e => {
                      setCause(e.target.value);
                    }}
                    name="comment"
                    rows={5}
                    cols={80}
                  ></textarea>
                </label>
              </div>
              <div className="col-span-2 text-right">
                <button
                  disabled={isInvalid()}
                  type="submit"
                  className={`"w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isInvalid() && " opacity-40"
                  }`}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </AppLayout>
  );
};

export default ReportPage;
