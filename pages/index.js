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
                main({
                  0: {
                    city: "Tehran",
                    h: 340,
                    connect: {
                      2: { city: "IslamShahr", g: 26, h: 320 },
                      3: { city: "Varamin", g: 61, h: 295 },
                      4: { city: "RobatKarim", g: 51, h: 316 },
                    },
                  },
                  1: {
                    city: "Saveh",
                    h: 285,
                    connect: {
                      4: { city: "RobatKarim", g: 95, h: 316 },
                      5: { city: "Salafchegan", g: 68, h: 232 },
                    },
                  },
                  2: {
                    city: "IslamShahr",
                    h: 320,
                    connect: {
                      0: { city: "Tehran", g: 26, h: 340 },
                      7: { city: "Qom", g: 130, h: 230 },
                    },
                  },
                  3: {
                    city: "Varamin",
                    h: 295,
                    connect: {
                      0: { city: "Tehran", g: 61, h: 340 },
                      6: { city: "GarmSar", g: 84, h: 290 },
                    },
                  },
                  4: {
                    city: "RobatKarim",
                    h: 316,
                    connect: {
                      0: { city: "Tehran", g: 51, h: 340 },
                      1: { city: "Saveh", g: 95, h: 285 },
                    },
                  },
                  5: {
                    city: "Salafchegan",
                    h: 232,
                    connect: {
                      1: { city: "Saveh", g: 68, h: 285 },
                      7: { city: "Qom", g: 47, h: 230 },
                      8: { city: "Delijan", g: 62, h: 173 },
                    },
                  },
                  6: {
                    city: "GarmSar",
                    h: 290,
                    connect: {
                      3: { city: "Varamin", g: 84, h: 295 },
                      7: { city: "Qom", g: 173, h: 230 },
                    },
                  },
                  7: {
                    city: "Qom",
                    h: 230,
                    connect: {
                      2: { city: "IslamShahr", g: 130, h: 320 },
                      5: { city: "Salafchegan", g: 47, h: 232 },
                      6: { city: "GarmSar", g: 173, h: 290 },
                      9: { city: "Kashan", g: 109, h: 149 },
                    },
                  },
                  8: {
                    city: "Delijan",
                    h: 173,
                    connect: {
                      5: { city: "Salafchegan", g: 62, h: 232 },
                      9: { city: "Kashan", g: 91, h: 149 },
                      10: { city: "Meime", g: 79, h: 99 },
                    },
                  },
                  9: {
                    city: "Kashan",
                    h: 149,
                    connect: {
                      7: { city: "Qom", g: 109, h: 230 },
                      8: { city: "Delijan", g: 91, h: 173 },
                      11: { city: "Natanz", g: 85, h: 98 },
                    },
                  },
                  10: {
                    city: "Meime",
                    h: 99,
                    connect: {
                      8: { city: "Delijan", g: 79, h: 173 },
                      12: { city: "ShahinShahr", g: 76, h: 24 },
                    },
                  },
                  11: {
                    city: "Natanz",
                    h: 98,
                    connect: {
                      9: { city: "Kashan", g: 85, h: 149 },
                      12: { city: "ShahinShahr", g: 108, h: 24 },
                      13: { city: "Isfahan", g: 126, h: 0 },
                    },
                  },
                  12: {
                    city: "ShahinShahr",
                    h: 24,
                    connect: {
                      10: { city: "Meime", g: 76, h: 99 },
                      11: { city: "Natanz", g: 108, h: 98 },
                      13: { city: "Isfahan", g: 32, h: 0 },
                    },
                  },
                  13: {
                    city: "Isfahan",
                    h: 0,
                    connect: {
                      11: { city: "Natanz", g: 126, h: 98 },
                      12: { city: "ShahinShahr", g: 32, h: 24 },
                    },
                  },
                });
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
