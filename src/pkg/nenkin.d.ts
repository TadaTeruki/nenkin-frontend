/* tslint:disable */
/* eslint-disable */
/**
*/
export class Network {
  free(): void;
/**
* @param {number} x
* @param {number} y
* @returns {Network}
*/
  set_start(x: number, y: number): Network;
/**
* @param {number} lifetime
* @returns {Network}
*/
  set_lifetime(lifetime: number): Network;
/**
* @returns {boolean}
*/
  iterate(): boolean;
/**
* @param {number} x
* @param {number} y
* @param {number | undefined} [cache_key]
* @returns {NumericProperty | undefined}
*/
  get_property(x: number, y: number, cache_key?: number): NumericProperty | undefined;
}
/**
*/
export class NetworkBuilder {
  free(): void;
/**
* @param {number} num
* @param {number} bound_x
* @param {number} bound_y
*/
  constructor(num: number, bound_x: number, bound_y: number);
/**
* @param {number | undefined} [edge_num_x]
* @param {number | undefined} [edge_num_y]
* @returns {NetworkBuilder}
*/
  add_edge_sites(edge_num_x?: number, edge_num_y?: number): NetworkBuilder;
/**
* @param {number} times
* @returns {NetworkBuilder | undefined}
*/
  relaxate_sites(times: number): NetworkBuilder | undefined;
/**
* @returns {Network | undefined}
*/
  build(): Network | undefined;
}
/**
*/
export class NumericProperty {
  free(): void;
/**
*/
  state_dead: number;
/**
*/
  state_live: number;
/**
*/
  state_none: number;
/**
*/
  state_path: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_numericproperty_free: (a: number) => void;
  readonly __wbg_get_numericproperty_state_none: (a: number) => number;
  readonly __wbg_set_numericproperty_state_none: (a: number, b: number) => void;
  readonly __wbg_get_numericproperty_state_live: (a: number) => number;
  readonly __wbg_set_numericproperty_state_live: (a: number, b: number) => void;
  readonly __wbg_get_numericproperty_state_path: (a: number) => number;
  readonly __wbg_set_numericproperty_state_path: (a: number, b: number) => void;
  readonly __wbg_get_numericproperty_state_dead: (a: number) => number;
  readonly __wbg_set_numericproperty_state_dead: (a: number, b: number) => void;
  readonly __wbg_network_free: (a: number) => void;
  readonly network_set_start: (a: number, b: number, c: number) => number;
  readonly network_set_lifetime: (a: number, b: number) => number;
  readonly network_iterate: (a: number) => number;
  readonly network_get_property: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly __wbg_networkbuilder_free: (a: number) => void;
  readonly networkbuilder_new: (a: number, b: number, c: number) => number;
  readonly networkbuilder_add_edge_sites: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly networkbuilder_relaxate_sites: (a: number, b: number) => number;
  readonly networkbuilder_build: (a: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
