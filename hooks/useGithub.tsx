import { Octokit } from "@octokit/rest";
export const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_KEY,
  userAgent: "skylight v1",
});
export const UseGitHub = () => {
  const reportPool = (pool, cause) => {
    return octokit.request(
      "POST /repos/Charlie85270/conflux-pos-pools/issues",
      {
        owner: "Charlie85270",
        repo: "conflux-pos-pools",
        title: `Report : ${pool}`,
        body: cause,
      }
    );
  };
  return {
    reportPool,
  };
};
