import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import server from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import {uglify} from 'rollup-plugin-uglify';
import clear from 'rollup-plugin-clear';
import copy from 'rollup-plugin-copy-assets';

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'umd',
        name: 'main',
        sourcemap: process.env.NODE_ENV === "development" ? true : false,
    },
    watch: {
        exclude: 'node_modules/**'
    },
    plugins: [
        clear({
            targets: ['dist'],
        }),
        copy({assets: []}),
        resolve({
            module: true
        }),
        commonjs(),
        replace({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        babel({
            exclude: 'node_modules/**'
        }),
        (process.env.NODE_ENV === "production") && uglify(),
        (process.env.NODE_ENV === "development") && server({
            open: true,
            contentBase: './dist'
        }),
        (process.env.NODE_ENV === "development") && livereload('dist')
    ]
};
