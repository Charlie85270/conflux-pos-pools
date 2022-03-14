import { PoolsInfosApi } from "../poolsInfos/table/Table";

interface PoolAlertProps {
  pool: PoolsInfosApi;
}

export const PoolAlert = ({ pool }: PoolAlertProps) => {
  return (
    <div className="flex items-center ">
      <span
        className={`relative inline-block mr-2 text-sm px-3 py-1 font-semibold leading-tight ${
          pool.status === "Active" ? "text-green-500" : "text-red-500"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-0 ${
            pool.status === "Active" ? "bg-green-200" : "bg-red-200"
          } rounded-full`}
        ></span>
        <span className="relative">{pool.status}</span>
      </span>
      <div className="flex gap-2">
        {pool.verified && (
          <div className="tooltip">
            <span className="tooltiptext">
              The contract of this pool has been verified on Conflux Scan
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.6787 1.72497L8.8724 0.166748L6.06605 1.72497L2.97984 2.60752L2.09728 5.69374L0.539062 8.50008L2.09728 11.3064L2.97984 14.3926L6.06605 15.2752L8.8724 16.8334L11.6787 15.2752L14.765 14.3926L15.6475 11.3064L17.2057 8.50008L15.6475 5.69374L14.765 2.60752L11.6787 1.72497ZM12.9614 6.65501C13.3231 6.23766 13.278 5.6061 12.8607 5.24439C12.4433 4.88268 11.8117 4.9278 11.45 5.34515L7.8724 9.4732L6.29475 7.65284C5.93304 7.23549 5.30149 7.19038 4.88413 7.55208C4.46678 7.91379 4.42166 8.54535 4.78337 8.9627L7.11671 11.655C7.30665 11.8742 7.58238 12.0001 7.8724 12.0001C8.16241 12.0001 8.43814 11.8742 8.62809 11.655L12.9614 6.65501Z"
                fill="#3861FB"
              ></path>
            </svg>
          </div>
        )}

        {pool.trusted && (
          <div className="tooltip">
            <span className="tooltiptext">
              This pool is used by Conflux team members
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 199 245"
              version="1.1"
            >
              <title>Conflux_Logo_Mark_Color</title>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Conflux_Logo_Mark_Color"
                  transform="translate(0.000000, -0.000000)"
                  fill-rule="nonzero"
                >
                  <polygon
                    id="Path"
                    fill="#1A1A1A"
                    points="151.057838 145.949662 98.7961863 198.210803 69.7103803 169.125338 121.972032 116.863685 98.7291726 93.6209957 22.9712333 169.376384 98.5203077 244.923077 174.276376 169.167689"
                  />
                  <polygon
                    id="Path"
                    fill="#38A1DB"
                    points="197.693744 98.7101231 98.9858316 9.56888949e-05 0 98.9860017 0.31563441 145.252991 98.5658906 47.0051607 197.528761 145.971262"
                  />
                </g>
              </g>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
