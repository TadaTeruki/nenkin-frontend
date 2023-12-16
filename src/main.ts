import "./style.css";
import init, { NetworkBuilder, Network, NumericProperty } from "./pkg/nenkin";

const livecolor: [number, number, number] = [250, 200, 0];
const deadcolor: [number, number, number] = [250, 240, 200];
const pathcolor: [number, number, number] = [250, 200, 0];
const nonecolor: [number, number, number] = [255, 255, 255];

function numerical_prop_to_color(
    prop: NumericProperty,
): [number, number, number] {
    const numerical_prop_sum =
        prop.state_live + prop.state_dead + prop.state_path + prop.state_none;

    if (numerical_prop_sum === 0) {
        return nonecolor;
    }

    const live_ratio = prop.state_live / numerical_prop_sum;
    const dead_ratio = prop.state_dead / numerical_prop_sum;
    const path_ratio = prop.state_path / numerical_prop_sum;
    const none_ratio = prop.state_none / numerical_prop_sum;
    return [
        livecolor[0] * live_ratio +
            deadcolor[0] * dead_ratio +
            pathcolor[0] * path_ratio +
            nonecolor[0] * none_ratio,
        livecolor[1] * live_ratio +
            deadcolor[1] * dead_ratio +
            pathcolor[1] * path_ratio +
            nonecolor[1] * none_ratio,
        livecolor[2] * live_ratio +
            deadcolor[2] * dead_ratio +
            pathcolor[2] * path_ratio +
            nonecolor[2] * none_ratio,
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
    image_data: ImageData | null;

    constructor(
        bound_x: number,
        bound_y: number,
        start_x: number,
        start_y: number,
        lifetime: number,
    ) {
        this.bound_x = bound_x;
        this.bound_y = bound_y;
        const network = new NetworkBuilder(num, this.bound_x, this.bound_y)
            .relaxate_sites(1)
            ?.add_edge_sites()
            ?.build();

        if (network === undefined) {
            throw new Error("Failed to build network");
        }
        this.network = network
            .set_start(start_x, start_y)
            .set_lifetime(lifetime);
        this.image_data = null;
    }

    iterate() {
        this.network.iterate();
    }

    update_canvas(canvas: HTMLCanvasElement) {
        const context = canvas.getContext("2d") as CanvasRenderingContext2D;

        const image_width = canvas.width;
        const image_height = canvas.height;
        if (this.image_data === null) {
            this.image_data = context.createImageData(
                image_width,
                image_height,
            );
        }
        const buffer = this.image_data.data;
        const x_scale = this.bound_x / image_width;
        const y_scale = this.bound_y / image_height;
        for (let y = 1; y < image_height - 1; y++) {
            for (let x = 1; x < image_width - 1; x++) {
                const index = (y * image_width + x) * 4;
                const prop = this.network.get_property(
                    x * x_scale,
                    y * y_scale,
                    index,
                );
                if (prop === undefined) {
                    continue;
                }
                const score = numerical_prop_to_color(prop);
                buffer[index + 0] = score[0];
                buffer[index + 1] = score[1];
                buffer[index + 2] = score[2];
                buffer[index + 3] = 255;
            }
        }
        context.putImageData(this.image_data, 0, 0);
    }
}

window.onload = async () => {
    await init();
    const nenkin = new Nenkin(
        bound_max_x,
        bound_max_y,
        start_x,
        start_y,
        lifetime,
    );

    const canvas = document.getElementById(
        "canvas_surface",
    ) as HTMLCanvasElement;

    nenkin.update_canvas(canvas);

    const interval_callback = () => {
        nenkin.iterate();
        nenkin.update_canvas(canvas);
        window.requestAnimationFrame(interval_callback);
    };

    window.requestAnimationFrame(interval_callback);
};
