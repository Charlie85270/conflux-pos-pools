import { Octokit } from "@octokit/rest";
export const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_KEY,
  userAgent: "skylight v1",
});
export const UseGitHub = () => {
  const reportPool = (pool, cause) => {
    return octokit.request(
      `POST /repos/${process.env.NEXT_PUBLIC_GITHUB_OWNER}/${process.env.NEXT_PUBLIC_GITHUB_REPO}/issues`,
      {
        owner: process.env.NEXT_PUBLIC_GITHUB_OWNER,
        repo: process.env.NEXT_PUBLIC_GITHUB_REPO,
        title: `Report : ${pool}`,
        body: cause,
      }
    );
  };
  return {
    reportPool,
  };
};
