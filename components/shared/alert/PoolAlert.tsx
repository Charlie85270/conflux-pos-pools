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
              The contract and the implementation of this pool has been verified
              on Conflux Scan
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clip-rule="evenodd"
                d="M11.6787 1.72497L8.8724 0.166748L6.06605 1.72497L2.97984 2.60752L2.09728 5.69374L0.539062 8.50008L2.09728 11.3064L2.97984 14.3926L6.06605 15.2752L8.8724 16.8334L11.6787 15.2752L14.765 14.3926L15.6475 11.3064L17.2057 8.50008L15.6475 5.69374L14.765 2.60752L11.6787 1.72497ZM12.9614 6.65501C13.3231 6.23766 13.278 5.6061 12.8607 5.24439C12.4433 4.88268 11.8117 4.9278 11.45 5.34515L7.8724 9.4732L6.29475 7.65284C5.93304 7.23549 5.30149 7.19038 4.88413 7.55208C4.46678 7.91379 4.42166 8.54535 4.78337 8.9627L7.11671 11.655C7.30665 11.8742 7.58238 12.0001 7.8724 12.0001C8.16241 12.0001 8.43814 11.8742 8.62809 11.655L12.9614 6.65501Z"
                fill="#3861FB"
              ></path>
            </svg>
          </div>
        )}
        {pool.isZero && (
          <div className="text-gray-500 tooltip dark:text-white">
            <span className="tooltiptext">
              The admin address is the zero address
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Layer_1"
              width="18"
              fill="currentColor"
              x="0px"
              y="0px"
              viewBox="0 0 330 330"
            >
              <g id="XMLID_504_">
                <path
                  id="XMLID_505_"
                  d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85   S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M207.481,219.356l-42.5,42.5   c-2.929,2.929-6.768,4.394-10.606,4.394s-7.678-1.465-10.606-4.394l-21.25-21.25c-5.858-5.858-5.858-15.354,0-21.213   c5.857-5.858,15.355-5.858,21.213,0l10.644,10.643l31.894-31.893c5.857-5.858,15.355-5.858,21.213,0   C213.34,204.002,213.34,213.498,207.481,219.356z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"
                />
              </g>
            </svg>
          </div>
        )}
        {pool.trusted && (
          <div className="tooltip dark:text-white">
            <span className="tooltiptext">Well-known pool</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 199 245"
              version="1.1"
            >
              <title>Conflux_Logo_Mark_Color</title>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Conflux_Logo_Mark_Color"
                  transform="translate(0.000000, -0.000000)"
                  fillRule="nonzero"
                >
                  <polygon
                    id="Path"
                    fill="currentColor"
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
