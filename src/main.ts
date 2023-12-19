import "./style.css";
import init, {
    NetworkBuilder,
    Network,
    NumericProperty,
    Weight,
} from "./pkg/nenkin";

const livecolor: [number, number, number] = [250, 200, 0];
const deadcolor: [number, number, number] = [250, 240, 200];
const pathcolor: [number, number, number] = [250, 200, 0];
const nonecolor: [number, number, number] = [255, 255, 255];
const wallcolor: [number, number, number] = [100, 100, 10];

type InputMode = "none" | "origin" | "wall";

function numerical_prop_to_color(
    prop: NumericProperty,
): [number, number, number] {
    const numerical_prop_sum =
        prop.state_live +
        prop.state_dead +
        prop.state_path +
        prop.state_none +
        prop.state_wall;

    if (numerical_prop_sum === 0) {
        return nonecolor;
    }

    const live_ratio = prop.state_live / numerical_prop_sum;
    const dead_ratio = prop.state_dead / numerical_prop_sum;
    const path_ratio = prop.state_path / numerical_prop_sum;
    const none_ratio = prop.state_none / numerical_prop_sum;
    const wall_ratio = prop.state_wall / numerical_prop_sum;
    return [
        livecolor[0] * live_ratio +
            deadcolor[0] * dead_ratio +
            pathcolor[0] * path_ratio +
            nonecolor[0] * none_ratio +
            wallcolor[0] * wall_ratio,
        livecolor[1] * live_ratio +
            deadcolor[1] * dead_ratio +
            pathcolor[1] * path_ratio +
            nonecolor[1] * none_ratio +
            wallcolor[1] * wall_ratio,
        livecolor[2] * live_ratio +
            deadcolor[2] * dead_ratio +
            pathcolor[2] * path_ratio +
            nonecolor[2] * none_ratio +
            wallcolor[2] * wall_ratio,
    ];
}

const num = 100000;
const bound_max_x = 1000.0;
const bound_max_y = 1000.0;
const start_x = 500.0;
const start_y = 500.0;
const lifetime = 2;

class Nenkin {
    bound_x: number;
    bound_y: number;
    network: Network;
    cache_ids: number[];

    constructor(
        bound_x: number,
        bound_y: number,
        start_x: number,
        start_y: number,
        lifetime: number,
        image_width: number,
        image_height: number,
    ) {
        this.bound_x = bound_x;
        this.bound_y = bound_y;
        const network = new NetworkBuilder(num, this.bound_x, this.bound_y)
            .relaxate_sites(10)
            ?.add_edge_sites()
            ?.build();

        if (network === undefined) {
            throw new Error("Failed to build network");
        }
        network.set_start(start_x, start_y);
        network.set_lifetime(lifetime);
        this.network = network;

        this.cache_ids = new Array(image_width * image_height);
        const x_scale = this.bound_x / image_width;
        const y_scale = this.bound_y / image_height;
        for (let y = 1; y < image_height; y++) {
            for (let x = 1; x < image_width; x++) {
                const index = y * image_width + x;
                const cache_id = this.network.add_cache(
                    x * x_scale,
                    y * y_scale,
                );
                this.cache_ids[index] = cache_id;
            }
        }
    }

    iterate() {
        this.network.iterate();
    }

    update_canvas(
        context: CanvasRenderingContext2D,
        image_width: number,
        image_height: number,
    ) {
        let image_data = context.getImageData(0, 0, image_width, image_height);
        let buffer = image_data.data;
        for (let y = 0; y < image_height; y++) {
            for (let x = 0; x < image_width; x++) {
                const index = y * image_width + x;
                const cache_id = this.cache_ids[index];
                if (!cache_id) {
                    continue;
                }
                const prop = this.network.get_property(cache_id);
                if (!prop) {
                    continue;
                }
                const score = numerical_prop_to_color(prop);
                buffer[index * 4 + 0] = score[0];
                buffer[index * 4 + 1] = score[1];
                buffer[index * 4 + 2] = score[2];
                buffer[index * 4 + 3] = 255;
            }
        }
        context.putImageData(image_data, 0, 0);
    }

    on_mouse(
        x: number,
        y: number,
        prev_x: number,
        prev_y: number,
        input_mode: InputMode,
    ) {
        if (input_mode === "none") {
            return;
        }
        if (input_mode === "origin") {
            this.network.set_start(x, y);
        }
        if (input_mode === "wall") {
            this.network.set_wall(x, y, prev_x, prev_y);
        }
    }
}

window.onload = async () => {
    await init();

    const canvas = document.getElementById(
        "canvas_surface",
    ) as HTMLCanvasElement;

    const nenkin = new Nenkin(
        bound_max_x,
        bound_max_y,
        start_x,
        start_y,
        lifetime,
        canvas.width,
        canvas.height,
    );

    let dragging = false;
    let [prev_x, prev_y] = [-1, -1];
    canvas.addEventListener("mousedown", () => {
        dragging = true;
    });
    canvas.addEventListener("mouseup", () => {
        dragging = false;
        [prev_x, prev_y] = [-1, -1];
    });

    canvas.addEventListener("mousemove", (event) => {
        if (!dragging) {
            return;
        }
        let input_mode: InputMode = "none";
        if (
            (document.getElementById("input_mode_origin") as HTMLInputElement)
                .checked
        ) {
            input_mode = "origin";
        }
        if (
            (document.getElementById("input_mode_wall") as HTMLInputElement)
                .checked
        ) {
            input_mode = "wall";
        }
        const x = (event.offsetX / canvas.width) * bound_max_x;
        const y = (event.offsetY / canvas.height) * bound_max_y;
        if (prev_x === -1 || prev_y === -1) {
            [prev_x, prev_y] = [x, y];
        }
        nenkin.on_mouse(x, y, prev_x, prev_y, input_mode);
        [prev_x, prev_y] = [x, y];
    });
    function interval_callback() {
        nenkin.iterate();
        const context = canvas.getContext("2d");
        if (!context) {
            return;
        }
        nenkin.update_canvas(context, canvas.width, canvas.height);
        window.requestAnimationFrame(interval_callback);
    }

    interval_callback();
};
