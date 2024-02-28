import { useEffect, useState, useMemo, useRef } from "react"
import { useGetWinesQuery } from "../../services/API"
import { useParams } from "react-router-dom"
import usePageWidth from "../../hooks/usePageWidth"
import {
  categoryPageData,
  sortCategoryPageData,
  filterCategoryPageData
} from "../../data/utils"
import { MAX_SMALLSCREEN, pagingSettings } from "../../data/appData.json"
import CategoryList from "../CategoryList"
import { Blurb } from "../Blurb"
import CategoryHeader from "../CategoryHeader"
import CategoryToggleItems from "../CategoryToggleItems"
import CategoryPaging from "../CategoryPaging"
import CategoryNoResults from "../CategoryNoResults"
import FilterList from "../Filters/FilterList"
import styles from "./Category.module.css"

const Category = () => {
  const { data } = useGetWinesQuery()
  const [sortName, setSortName] = useState("")
  const [filters, setFilters] = useState({})
  const [paging, setPaging] = useState(pagingSettings)
  const { category: urlCategory, variety: urlVariety } = useParams()
  const isSmallScreen = usePageWidth(MAX_SMALLSCREEN)
  const dataRef = useRef([])
  const headerRef = useRef("")
  const didMount = useRef(false)
  const [isShowItems, setIsShowItems] = useState(false)
  const isSmallScreenShowItems = isSmallScreen && isShowItems

  useEffect(() => {
    if (didMount.current) {
      // reset page variables if URL changes
      setSortName("")
      setFilters({})
      dataRef.current = []
      headerRef.current = ""
    } else {
      didMount.current = true
    }
  }, [urlCategory, urlVariety])

  if (data && urlCategory && dataRef.current.length === 0) {
    const [arr, header] = categoryPageData(data, urlCategory, urlVariety)
    dataRef.current = arr
    headerRef.current = header
  }

  const currentData = useMemo(() => {
    setPaging(pagingSettings)
    let arr = [...dataRef.current]
    if (arr.length) {
      if (Object.keys(filters).length) {
        arr = filterCategoryPageData(arr, filters)
      }
      if (sortName) {
        arr = sortCategoryPageData(arr, sortName)
      }
    }
    return arr
  }, [filters, sortName])

  const pagedData = currentData.slice(
    (paging.page - 1) * paging.pageSize,
    paging.page * paging.pageSize
  )

  const updateFilters = filter => setFilters({ ...filters, ...filter })

  const removeFilters = val => {
    if (val === "all") {
      setFilters({})
    } else {
      delete filters[val]
      setFilters({ ...filters })
    }
  }

  const updatePaging = ({ page, pageSize }) => {
    window.scrollTo(0, 0)
    setPaging({ page, pageSize })
  }

  const togglePageItems = () => {
    // either show filters or items on small screen
    setIsShowItems(prev => !prev)
  }

  return (
    <article>
      <Blurb
        urlCategory={urlCategory}
        urlVariety={urlVariety}
        header={headerRef.current}
      />
      {isSmallScreen && (
        <CategoryToggleItems
          togglePageItems={togglePageItems}
          isItems={isSmallScreenShowItems}
        />
      )}
      <div className={styles.category}>
        <div
          className={
            isSmallScreenShowItems ? styles.itemCont : styles.filterCont
          }
        >
          <FilterList
            currentData={currentData}
            filters={filters}
            urlVariety={urlVariety}
            updateFilters={updateFilters}
          />
        </div>
        <div
          className={
            isSmallScreenShowItems ? styles.filterCont : styles.itemCont
          }
        >
          <section className={styles.categoryItems}>
            <CategoryHeader
              filters={filters}
              removeFilters={removeFilters}
              dataLength={currentData.length}
              sortName={sortName}
              setSortName={setSortName}
            />
            {currentData.length > 0 ? (
              <>
                <CategoryList arr={pagedData} />
                <CategoryPaging
                  currentData={currentData}
                  paging={paging}
                  updatePaging={updatePaging}
                />
              </>
            ) : (
              <CategoryNoResults />
            )}
          </section>
        </div>
      </div>
    </article>
  )
}
export default Category
