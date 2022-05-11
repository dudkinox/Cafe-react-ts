import { useEffect, useState } from "react";
import Banner from "../components/banner";
import Content from "../components/content";
import StoreModel from "../models/StoreModel";
import StoreService from "../services/StoreService";

export default function Body() {
  const [listStore, setListStore] = useState<StoreModel[] | null>();

  const fetchData = () => {
    StoreService.getAllStore().then((res) => {
      setListStore(res);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Banner
        setListStore={setListStore}
        listStore={listStore}
        fetchData={fetchData}
      />
      <Content listStore={listStore} />
    </>
  );
}
