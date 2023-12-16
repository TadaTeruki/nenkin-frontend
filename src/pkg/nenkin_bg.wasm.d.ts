/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function __wbg_network_free(a: number): void;
export function network_set_start(a: number, b: number, c: number): number;
export function network_set_lifetime(a: number, b: number): number;
export function network_iterate(a: number): number;
export function network_get_nearest_site(
    a: number,
    b: number,
    c: number,
    d: number,
): void;
export function network_get_property(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
): number;
export function __wbg_numericproperty_free(a: number): void;
export function __wbg_get_numericproperty_state_none(a: number): number;
export function __wbg_set_numericproperty_state_none(
    a: number,
    b: number,
): void;
export function __wbg_get_numericproperty_state_live(a: number): number;
export function __wbg_set_numericproperty_state_live(
    a: number,
    b: number,
): void;
export function __wbg_get_numericproperty_state_path(a: number): number;
export function __wbg_set_numericproperty_state_path(
    a: number,
    b: number,
): void;
export function __wbg_get_numericproperty_state_dead(a: number): number;
export function __wbg_set_numericproperty_state_dead(
    a: number,
    b: number,
): void;
export function __wbg_networkbuilder_free(a: number): void;
export function networkbuilder_new(a: number, b: number, c: number): number;
export function networkbuilder_add_edge_sites(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
): number;
export function networkbuilder_relaxate_sites(a: number, b: number): number;
export function networkbuilder_build(a: number): number;
export function __wbindgen_add_to_stack_pointer(a: number): number;
