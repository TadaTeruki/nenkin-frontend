/* tslint:disable */
/* eslint-disable */
/**
 */
export class Network {
    free(): void;
    /**
     * @param {number} from
     * @param {number} to
     * @returns {Uint32Array | undefined}
     */
    seartch_path(from: number, to: number): Uint32Array | undefined;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} prev_x
     * @param {number} prev_y
     */
    set_wall(x: number, y: number, prev_x: number, prev_y: number): void;
    /**
     * @param {number} x
     * @param {number} y
     */
    set_start(x: number, y: number): void;
    /**
     * @param {number} lifetime
     */
    set_lifetime(lifetime: number): void;
    /**
     * @returns {boolean}
     */
    iterate(): boolean;
    /**
     * @param {number} x
     * @param {number} y
     * @returns {number | undefined}
     */
    get_nearest_site(x: number, y: number): number | undefined;
    /**
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    add_cache(x: number, y: number): number;
    /**
     * @param {number} key
     * @returns {NumericProperty | undefined}
     */
    get_property(key: number): NumericProperty | undefined;
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
    /**
     */
    state_wall: number;
}
/**
 */
export class Weight {
    free(): void;
    /**
     * @param {number} index
     * @param {number} weight
     * @returns {Weight}
     */
    static new(index: number, weight: number): Weight;
    /**
     */
    index: number;
    /**
     */
    weight: number;
}

export type InitInput =
    | RequestInfo
    | URL
    | Response
    | BufferSource
    | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_network_free: (a: number) => void;
    readonly __wbg_weight_free: (a: number) => void;
    readonly __wbg_get_weight_index: (a: number) => number;
    readonly __wbg_set_weight_index: (a: number, b: number) => void;
    readonly __wbg_get_weight_weight: (a: number) => number;
    readonly __wbg_set_weight_weight: (a: number, b: number) => void;
    readonly weight_new: (a: number, b: number) => number;
    readonly network_seartch_path: (
        a: number,
        b: number,
        c: number,
        d: number,
    ) => void;
    readonly network_set_wall: (
        a: number,
        b: number,
        c: number,
        d: number,
        e: number,
    ) => void;
    readonly network_set_start: (a: number, b: number, c: number) => void;
    readonly network_set_lifetime: (a: number, b: number) => void;
    readonly network_iterate: (a: number) => number;
    readonly network_get_nearest_site: (
        a: number,
        b: number,
        c: number,
        d: number,
    ) => void;
    readonly network_add_cache: (a: number, b: number, c: number) => number;
    readonly network_get_property: (a: number, b: number) => number;
    readonly __wbg_numericproperty_free: (a: number) => void;
    readonly __wbg_get_numericproperty_state_none: (a: number) => number;
    readonly __wbg_set_numericproperty_state_none: (
        a: number,
        b: number,
    ) => void;
    readonly __wbg_get_numericproperty_state_live: (a: number) => number;
    readonly __wbg_set_numericproperty_state_live: (
        a: number,
        b: number,
    ) => void;
    readonly __wbg_get_numericproperty_state_path: (a: number) => number;
    readonly __wbg_set_numericproperty_state_path: (
        a: number,
        b: number,
    ) => void;
    readonly __wbg_get_numericproperty_state_dead: (a: number) => number;
    readonly __wbg_set_numericproperty_state_dead: (
        a: number,
        b: number,
    ) => void;
    readonly __wbg_get_numericproperty_state_wall: (a: number) => number;
    readonly __wbg_set_numericproperty_state_wall: (
        a: number,
        b: number,
    ) => void;
    readonly __wbg_networkbuilder_free: (a: number) => void;
    readonly networkbuilder_new: (a: number, b: number, c: number) => number;
    readonly networkbuilder_add_edge_sites: (
        a: number,
        b: number,
        c: number,
        d: number,
        e: number,
    ) => number;
    readonly networkbuilder_relaxate_sites: (a: number, b: number) => number;
    readonly networkbuilder_build: (a: number) => number;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
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
export default function __wbg_init(
    module_or_path?: InitInput | Promise<InitInput>,
): Promise<InitOutput>;
