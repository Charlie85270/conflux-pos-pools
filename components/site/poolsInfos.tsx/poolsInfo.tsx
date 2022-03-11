import React from "react";
import pools from "../../../pools.json";
import { PoolsTable } from "./poolsTable";

export function PoolsInfo() {
  return (
    <div>
      <h2 className="my-4 text-xl">Conflux Pools list</h2>
      <PoolsTable pools={pools} />
    </div>
  );
}
