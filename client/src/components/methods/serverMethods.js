import { useEffect, useState } from "react";
import axios from "axios";
import { loginRequest } from "../authentication/authConfig";

// Server call methods
export const useFetch = (url, options) => {
  const [data, setData] = useState([]);
  const bearer = `Bearer ${options}`;
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: bearer,
        },
      })
      .then((res) => {
        setData(unstringifyEntity(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url, options, bearer, setData]);
  return data;
};

// Fetch Token for api callbacks
export const FetchToken = (instance, accounts) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };
    instance.acquireTokenSilent(request).then((response) => {
      setData(response.accessToken);
    });
  }, [instance, accounts, setData]);
  return data;
};

// TODO Could use above method combine with a check for type
export const useFetchImage = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(url)
      .then((image) => {
        setData(image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url, setData]);
  return data;
};

export const usePostOrPut = (url, data, methodType) => {
  const requestOptions = {
    method: methodType,
    headers: { "Content-Type": "application/json" },
    body: data,
  };
  fetch(url, requestOptions);
};

export const useDelete = (url) => {
  axios.delete(url);
};

const propertiesArray = [
  "roles",
  "skills",
  "educations",
  "experiences",
  "period",
];

// to unstringify entities when passing through front end
export const unstringifyEntity = (entity) => {
  if (entity.length) {
    for (var i = 0; i < entity.length; i++) {
      for (const prop in entity[i]) {
        if (propertiesArray.includes(prop)) {
          entity[i][prop] = JSON.parse(entity[i][prop]);
        }
      }
    }
  } else {
    for (const prop in entity) {
      if (propertiesArray.includes(prop)) {
        entity[prop] = JSON.parse(entity[prop]);
      }
    }
  }
  return entity;
};
