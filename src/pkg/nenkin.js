let wasm;

const cachedTextDecoder =
    typeof TextDecoder !== "undefined"
        ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true })
        : {
              decode: () => {
                  throw Error("TextDecoder not available");
              },
          };

if (typeof TextDecoder !== "undefined") {
    cachedTextDecoder.decode();
}

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);
}

function isLikeNone(x) {
    return x === undefined || x === null;
}
/**
 */
export class Network {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Network.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_network_free(ptr);
    }
    /**
     * @param {number} from
     * @param {number} to
     * @returns {Uint32Array | undefined}
     */
    seartch_path(from, to) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.network_seartch_path(retptr, this.__wbg_ptr, from, to);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getArrayU32FromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 4, 4);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} prev_x
     * @param {number} prev_y
     */
    set_wall(x, y, prev_x, prev_y) {
        wasm.network_set_wall(this.__wbg_ptr, x, y, prev_x, prev_y);
    }
    /**
     * @param {number} x
     * @param {number} y
     */
    set_start(x, y) {
        wasm.network_set_start(this.__wbg_ptr, x, y);
    }
    /**
     * @param {number} lifetime
     */
    set_lifetime(lifetime) {
        wasm.network_set_lifetime(this.__wbg_ptr, lifetime);
    }
    /**
     * @returns {boolean}
     */
    iterate() {
        const ret = wasm.network_iterate(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @returns {number | undefined}
     */
    get_nearest_site(x, y) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.network_get_nearest_site(retptr, this.__wbg_ptr, x, y);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    add_cache(x, y) {
        const ret = wasm.network_add_cache(this.__wbg_ptr, x, y);
        return ret >>> 0;
    }
    /**
     * @param {number} key
     * @returns {NumericProperty | undefined}
     */
    get_property(key) {
        const ret = wasm.network_get_property(this.__wbg_ptr, key);
        return ret === 0 ? undefined : NumericProperty.__wrap(ret);
    }
}
/**
 */
export class NetworkBuilder {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(NetworkBuilder.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_networkbuilder_free(ptr);
    }
    /**
     * @param {number} num
     * @param {number} bound_x
     * @param {number} bound_y
     */
    constructor(num, bound_x, bound_y) {
        const ret = wasm.networkbuilder_new(num, bound_x, bound_y);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
     * @param {number | undefined} [edge_num_x]
     * @param {number | undefined} [edge_num_y]
     * @returns {NetworkBuilder}
     */
    add_edge_sites(edge_num_x, edge_num_y) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.networkbuilder_add_edge_sites(
            ptr,
            !isLikeNone(edge_num_x),
            isLikeNone(edge_num_x) ? 0 : edge_num_x,
            !isLikeNone(edge_num_y),
            isLikeNone(edge_num_y) ? 0 : edge_num_y,
        );
        return NetworkBuilder.__wrap(ret);
    }
    /**
     * @param {number} times
     * @returns {NetworkBuilder | undefined}
     */
    relaxate_sites(times) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.networkbuilder_relaxate_sites(ptr, times);
        return ret === 0 ? undefined : NetworkBuilder.__wrap(ret);
    }
    /**
     * @returns {Network | undefined}
     */
    build() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.networkbuilder_build(ptr);
        return ret === 0 ? undefined : Network.__wrap(ret);
    }
}
/**
 */
export class NumericProperty {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(NumericProperty.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_numericproperty_free(ptr);
    }
    /**
     * @returns {number}
     */
    get state_none() {
        const ret = wasm.__wbg_get_numericproperty_state_none(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set state_none(arg0) {
        wasm.__wbg_set_numericproperty_state_none(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get state_live() {
        const ret = wasm.__wbg_get_numericproperty_state_live(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set state_live(arg0) {
        wasm.__wbg_set_numericproperty_state_live(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get state_path() {
        const ret = wasm.__wbg_get_numericproperty_state_path(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set state_path(arg0) {
        wasm.__wbg_set_numericproperty_state_path(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get state_dead() {
        const ret = wasm.__wbg_get_numericproperty_state_dead(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set state_dead(arg0) {
        wasm.__wbg_set_numericproperty_state_dead(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get state_wall() {
        const ret = wasm.__wbg_get_numericproperty_state_wall(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set state_wall(arg0) {
        wasm.__wbg_set_numericproperty_state_wall(this.__wbg_ptr, arg0);
    }
}
/**
 */
export class Weight {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Weight.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_weight_free(ptr);
    }
    /**
     * @returns {number}
     */
    get index() {
        const ret = wasm.__wbg_get_weight_index(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set index(arg0) {
        wasm.__wbg_set_weight_index(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get weight() {
        const ret = wasm.__wbg_get_weight_weight(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set weight(arg0) {
        wasm.__wbg_set_weight_weight(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} index
     * @param {number} weight
     * @returns {Weight}
     */
    static new(index, weight) {
        const ret = wasm.weight_new(index, weight);
        return Weight.__wrap(ret);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === "function" && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === "function") {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                if (module.headers.get("Content-Type") != "application/wasm") {
                    console.warn(
                        "`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
                        e,
                    );
                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_throw = function (arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint32Memory0 = null;
    cachedUint8Memory0 = null;

    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === "undefined") {
        input = new URL("nenkin_bg.wasm", import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (
        typeof input === "string" ||
        (typeof Request === "function" && input instanceof Request) ||
        (typeof URL === "function" && input instanceof URL)
    ) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
