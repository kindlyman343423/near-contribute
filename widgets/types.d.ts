declare function useCache(
  promiseGenerator: () => Promise<any>,
  dataKey: string,
  options?: { subscribe?: boolean }
): null | unknown;

declare function fetch(
  url: string,
  options?: { method?: string; headers?: Record<string, string>; body?: string }
): null | unknown;

declare function asyncFetch(
  url: string,
  options?: { method?: string; headers?: Record<string, string>; body?: string }
): Promise<unknown>;

declare namespace context {
  const accountId: string;
  const widgetSrc: string;
}

declare const state: Record<string, any>;

declare namespace Near {
  type Transaction = {
    contractName: string;
    methodName: string;
    args?: Record<string, any>;
    gas?: string | number;
    deposit?: string | number;
  };

  function view(
    contractName: string,
    methodName: string,
    args: Record<string, any>,
    finality: "final" | number,
    subscribe: boolean
  ): null | unknown;

  function asyncView(
    contractName: string,
    methodName: string,
    args?: Record<string, any>,
    finality?: "final" | number,
    subscribe?: boolean
  ): Promise<null | unknown>;

  function call(
    contractName: string,
    methodName: string,
    args?: Record<string, any>,
    gas?: string | number,
    deposit?: string | number
  ): void;
  function call(txs: Transaction | Transaction[]): void;
}

declare namespace Social {
  function get(
    patterns: string | string[],
    finality?: "final" | number,
    options?: { subscribe?: boolean; return_deleted?: boolean }
  ): null | unknown;

  function getr(
    patterns: string | string[],
    finality?: "final" | number,
    options?: { subscribe?: boolean; return_deleted?: boolean }
  ): null | unknown;

  function keys(
    patterns: string | string[],
    finality?: "final" | number,
    options?: {
      subscribe?: boolean;
      return_type?: "History" | "True" | "BlockHeight";
      return_deleted?: boolean;
      values_only?: boolean;
    }
  ): null | unknown;

  function index(
    action: string,
    key: string,
    options?: {
      accountId?: string;
      order?: "asc" | "desc";
      limit?: number;
      from?: number;
    }
  ): null | unknown;
}

declare namespace State {
  function init(state: Record<string, any>): void;

  function update(state: Record<string, any>, init?: Record<string, any>): void;
}

interface Storage {
  set(key: string, value: any): void;

  get(key: string, widgetSrc?: string): null | unknown;

  privateSet(key: string, value: any): void;

  privateGet(key: string): null | unknown;
}
