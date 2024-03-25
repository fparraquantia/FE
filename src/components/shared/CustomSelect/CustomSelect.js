import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import styles from "./CustomSelect.module.scss";
import { VscTriangleDown } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";

// const options = [
//     {label: "Boiler", value: "Boiler"},
//     {label: "Blinder Tank", value: "Blinder Tank"},
//     {label: "Opender", value: "Opender"},
//     {label: "Steam Boiler", value: "Steam Boiler"},
//     {label: "Heat Exchanger", value: "Heat Exchanger"},
//     {label: "Dosing Pump", value: "Dosing Pump"},
// ]

const CustomSelect = forwardRef(
  (
    {
      onChange = () => {},
      options = [],
      initValue = "",
      isMulti = false,
      isSearchable = false,
      align = "auto",
      placeHolder = "",
      style = "primary",
      label = "",
      labelPosition = "right",
      labelStyle = "normal",
      widthLabel = 140,
      gap = 30,
      optionsWidth,
      optionElement,
      optionElementPosition = "right",
      disabled = false,
      showValuesWhenDisabled = true,
    },
    ref
  ) => {
    // State variables using React hooks
    const [showMenu, setShowMenu] = useState(false); // Controls the visibility of the dropdown menu
    const [selectedValue, setSelectedValue] = useState([]); // Stores the selected value(s)
    const [searchValue, setSearchValue] = useState(""); // Stores the value entered in the search input
    const searchRef = useRef(); // Reference to the search input element
    const inputRef = useRef(); // Reference to the custom select input element
    const [hoverIndex, setHoverIndex] = useState(-1); // Nuevo estado para manejar el índice resaltado
    const menuRef = useRef(); // Referencia al menú desplegable

    const customSelectStyle = useMemo(
      () =>
        style == "primary"
          ? styles.customSelectPrimary
          : style == "secondary"
          ? styles.customSelectSecondary
          : style == "white"
          ? styles.customSelectWhite
          : "",
      [style]
    );

    const colorTriangle = useMemo(
      () =>
        showMenu && !disabled
          ? "#0069C8"
          : style == "primary"
          ? "#ffffff"
          : style == "secondary"
          ? "#b3b3b3"
          : style == "white"
          ? "#E6E6E6"
          : "",
      [style, showMenu]
    );

    useEffect(() => {
      if (disabled) return;
      if (menuRef.current) {
        if (hoverIndex > 4) {
          menuRef.current.scrollTop = 0;
        }
        menuRef.current.scrollTop = (hoverIndex - 4) * 35;
      }
    }, [hoverIndex, menuRef.current]);

    // Usar useImperativeHandle para exponer la función clean
    useImperativeHandle(ref, () => ({
      clean() {
        setSelectedValue([]); // Limpia el valor seleccionado
      },
    }));
    // Actualizar selectedValue basado en el valor de la prop 'value'
    useEffect(() => {
      const newValue = options.find((option) => option.value === initValue);
      const conincidence = selectedValue.find(
        (item) => item.value === initValue
      );
      if (selectedValue.length > 0 && !newValue) {
        setSelectedValue([]);
      } else if ((selectedValue.length > 1 || !conincidence) && newValue) {
        setSelectedValue([newValue]);
      }
    }, [initValue, options]);

    useEffect(() => {
      setSearchValue("");
      if (showMenu && searchRef.current) {
        searchRef.current.focus();
      }

      if (!showMenu) setHoverIndex(-1);
    }, [showMenu]);

    useEffect(() => {
      onChange && onChange(selectedValue);
    }, [selectedValue]);

    const handleInputClick = useCallback(() => {
      setShowMenu((prevShow) => !prevShow);
    }, []);

    const removeOption = (option) => {
      return selectedValue.filter((o) => o.value !== option.value);
    };

    const onTagRemove = (e, option) => {
      e.stopPropagation();
      const newValue = removeOption(option);
      setSelectedValue(newValue);
    };

    const onItemClick = useCallback(
      (option) => {
        let newValue;
        if (isMulti) {
          if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
            newValue = removeOption(option);
          } else {
            newValue = [...selectedValue, option];
          }
        } else {
          newValue = [option];
        }
        setSelectedValue(newValue);
      },
      [isMulti, selectedValue, onChange]
    );

    const isSelected = (option) =>
      selectedValue.some((o) => o.value === option.value);

    const onSearch = (e) => {
      setSearchValue(e.target.value);
    };

    const getOptions = () => {
      if (!searchValue) {
        return options;
      }

      return options.filter(
        (option) =>
          option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
      );
    };

    const onKeyDown = (e) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          if (disabled) return;
          if (showMenu && hoverIndex != -1) {
            onItemClick(options?.[hoverIndex]);
          }
          setShowMenu((prev) => !prev);
          break;
        case "ArrowDown":
        case "ArrowUp":
          e.preventDefault();
          if (disabled) return;
          if (!showMenu) {
            setShowMenu(true);
            setHoverIndex(0);
          } else {
            setHoverIndex((prevIndex) => {
              return e.key === "ArrowDown"
                ? prevIndex + 1 !== options.length
                  ? prevIndex + 1
                  : -1
                : prevIndex == -1
                ? options.length - 1
                : prevIndex - 1;
            });
          }
          break;
        case "Tab":
          setShowMenu(false);
          break;
        case "Escape":
          setShowMenu(false);
          break;

        default:
          break;
      }
    };
    const onBlurHandler = useCallback(
      (_e) => {
        setTimeout(() => {
          setShowMenu(false);
        }, 150);
      },
      [showMenu]
    );

    const getDisplay = useMemo(() => {
      if (
        !selectedValue ||
        selectedValue.length === 0 ||
        (disabled && !showValuesWhenDisabled)
      ) {
        return placeHolder;
      }
      if (isMulti) {
        return (
          <div className={styles.customSelectTags}>
            {selectedValue.map((option, index) => (
              <div
                key={`${option.value}-${index}`}
                className={styles.customSelectTagsItem}
              >
                {option.label}
                <span
                  onClick={(e) => onTagRemove(e, option)}
                  className={styles.customSelectTagsClose}
                >
                  <AiOutlineClose
                    size={20}
                    style={{
                      color: style == "primary" ? "#ffffff" : "#b3b3b3",
                    }}
                  />
                </span>
              </div>
            ))}
          </div>
        );
      }
      return selectedValue?.[0].label;
    }, [selectedValue, isMulti]);

    const labelPositionStyle =
      labelPosition == "left"
        ? styles.inputContainerLabelLeft
        : labelPosition == "center"
        ? styles.inputContainerLabelCenter
        : labelPosition == "right"
        ? styles.inputContainerLabelRight
        : "";

    const labelStyleClass =
      labelStyle == "normal"
        ? styles.inputContainerLabelNormal
        : labelStyle == "title"
        ? styles.inputContainerLabelTitle
        : "";

    return (
      <div style={{ gap: `${gap}px` }} className={styles.inputContainer}>
        {label && label !== "" ? (
          <div
            style={{ width: `${widthLabel}px` }}
            className={`${styles.inputContainerLabel} ${labelPositionStyle} ${labelStyleClass}`}
          >
            <p>{label}</p>
          </div>
        ) : (
          <></>
        )}
        <div className={`${styles.customSelect} ${customSelectStyle}`}>
          <div
            ref={inputRef}
            onClick={handleInputClick}
            className={styles.customSelectInput}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onBlur={onBlurHandler}
          >
            <p
              className={
                !selectedValue || selectedValue.length === 0
                  ? styles.customSelectInputSelectedPlaceholder
                  : ""
              }
            >
              {getDisplay}
            </p>
            <div>
              <div className={styles.customSelectTool}>
                <VscTriangleDown color={colorTriangle} />
              </div>
            </div>
          </div>

          {showMenu && !disabled && (
            <div
              style={{ width: `${optionsWidth}px` }}
              className={`${styles.customSelectMenu} ${
                align == "left"
                  ? styles.customSelectMenuLeft
                  : align == "right"
                  ? styles.customSelectMenuRight
                  : ""
              }`}
              ref={menuRef}
            >
              {isSearchable && (
                <div className={styles.customSelectSearchBox}>
                  <input
                    className="form-control"
                    onChange={onSearch}
                    value={searchValue}
                    ref={searchRef}
                  />
                </div>
              )}
              {getOptions().map((option, index) => (
                <div
                  onClick={() => onItemClick(option)}
                  key={option.value}
                  className={`${styles.customSelectItem} ${
                    hoverIndex === index ? styles.customSelectItemHover : ""
                  } ${
                    (isSelected(option) && styles.customSelectItemSelected) ||
                    ""
                  }`}
                >
                  {optionElement && optionElementPosition == "left" ? (
                    optionElement
                  ) : (
                    <></>
                  )}
                  <span>{option.label}</span>
                  {optionElement && optionElementPosition == "right" ? (
                    optionElement
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default CustomSelect;
