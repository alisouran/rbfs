import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import main from "./../ai/main";
import Link from "next/link";

export default function Home() {
  const [cities, setCities] = useState({});
  const [inputs, setInputs] = useState(["input-0"]);
  // useEffect(() => {
  //   console.log("🚀 ~ cities", JSON.stringify(cities));
  // });
  return (
    <div className={styles.container}>
      <Head>
        <title>Recursive Best First Search</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Recursive Best First Search</h1>
        <div className={styles.grid}>
          {inputs.map((input, i) => {
            return (
              <div key={input + i} className={styles.card}>
                <input
                  key={input}
                  type="text"
                  placeholder="city"
                  value={cities[i] ? cities[i].city : ""}
                  onChange={(e) => {
                    setCities({
                      ...cities,
                      [i]: { ...cities[i], city: e.target.value },
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder="h(n)"
                  value={cities[i] ? cities[i].h : ""}
                  onChange={(e) => {
                    setCities({
                      ...cities,
                      [i]: {
                        ...cities[i],
                        h:
                          e.target.value !== "" ? parseInt(e.target.value) : "",
                      },
                    });
                  }}
                />
                <h4>Connect To:</h4>
                {Object.keys(cities).map((key, j) => {
                  if (cities[i]) {
                    if (cities[i].city !== cities[key].city) {
                      return (
                        <div key={key + i} style={{ display: "block" }}>
                          <label htmlFor={`${key}-${i}`}>
                            {cities[key].city}
                          </label>
                          <input
                            defaultChecked={false}
                            type="checkbox"
                            id={`${key}-${i}`}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCities({
                                  ...cities,
                                  [i]: {
                                    ...cities[i],
                                    connect: {
                                      ...cities[i].connect,
                                      [j]: cities[i].connect
                                        ? {
                                            ...cities[i].connect[j],
                                            city: cities[key].city,
                                          }
                                        : {
                                            city: cities[key].city,
                                          },
                                    },
                                  },
                                });
                              } else {
                                let obj = cities[i].connect;
                                delete obj[j];
                                console.log(obj);
                                setCities({
                                  ...cities,
                                  [i]: {
                                    ...cities[i],
                                    connect: obj,
                                  },
                                });
                              }
                            }}
                          />
                          {cities[i].connect &&
                            Object.keys(cities[i].connect).map((key2, k) => {
                              if (
                                cities[i].connect[key2].city ===
                                cities[key].city
                              ) {
                                return (
                                  <input
                                    key={key2 + k}
                                    placeholder="g(n) from start..."
                                    type="text"
                                    id={`${key2}-${i}_${i}`}
                                    value={cities[i].connect[j].g}
                                    onChange={(e) => {
                                      setCities({
                                        ...cities,
                                        [i]: {
                                          ...cities[i],
                                          connect: {
                                            ...cities[i].connect,
                                            [j]: cities[i].connect
                                              ? {
                                                  ...cities[i].connect[j],
                                                  g:
                                                    e.target.value !== ""
                                                      ? parseInt(e.target.value)
                                                      : "",
                                                  h: cities[j].h,
                                                }
                                              : {
                                                  g:
                                                    e.target.value !== ""
                                                      ? parseInt(e.target.value)
                                                      : "",
                                                  h: cities[j].h,
                                                },
                                          },
                                        },
                                      });
                                    }}
                                  />
                                );
                              }
                            })}
                        </div>
                      );
                    }
                  }
                })}
              </div>
            );
          })}
        </div>
        <div className={styles.grid}>
          <button
            onClick={() => {
              let newInput = `Input-${inputs.length}`;
              setInputs((inputs) => [...inputs, newInput]);
            }}
          >
            ADD INPUT
          </button>
        </div>
        <div className={styles.grid}>
          <Link href="#" scroll={false}>
            <a
              onClick={() => {
                main(cities);
              }}
              className={styles.card}
            >
              <h3>Run Algorithm &rarr;</h3>
              <p>
                First enter the cities and their heuristic functions, then run
                the algorithm.
              </p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/alisouran"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alireza Souran
        </a>
      </footer>
    </div>
  );
}
