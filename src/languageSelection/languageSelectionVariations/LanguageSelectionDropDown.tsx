import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  type LayoutRectangle,
} from 'react-native';
import { useSelector } from 'react-redux';

// Define the types of the props
interface LanguageSelectionDropDownProps {
  languages: string[];
  selectedLanguage: string;
  handleLanguageChange: (value: string) => void;
}

export function LanguageSelectionDropDown({
  languages,
  selectedLanguage,
  handleLanguageChange,
}: LanguageSelectionDropDownProps) {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] =
    useState<LayoutRectangle | null>(null);
  const dropdownButtonRef = useRef<TouchableOpacity | null>(null);

  const showModal = () => {
    if (dropdownButtonRef.current) {
      dropdownButtonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setDropdownPosition({ x: pageX, y: pageY + height, width, height });
        setModalVisible(true);
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Touchable button that opens the modal */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={showModal}
        ref={dropdownButtonRef}
      >
        <Text style={styles.dropdownText}>{selectedLanguage}</Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      {/* Modal for language selection */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          {dropdownPosition && (
            <View
              style={[
                styles.modalContent,
                {
                  top: dropdownPosition.y,
                  left: dropdownPosition.x,
                  width: dropdownPosition.width,
                },
              ]}
            >
              <FlatList
                data={languages}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.languageOption}
                    onPress={() => {
                      handleLanguageChange(item);
                      setModalVisible(false);
                    }}
                  >
                    {/* Checkmark for selected language */}
                    <Text style={styles.optionIcon}>
                      {' '}
                      {selectedLanguage === item ? '✓ ' : '  '}
                    </Text>
                    <Text
                      style={[
                        styles.languageText,
                        selectedLanguage === item && styles.languageTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  container: {},
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: cssTheme.colors.primary[500],
    borderRadius: 24,
    borderWidth: 1,
    borderColor: cssTheme.colors.gray[200],
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dropdownText: {
    color: cssTheme.colors.primary[900],
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  dropdownArrow: {
    color: cssTheme.colors.primary[900],
    fontSize: 14,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
  },
  modalContent: {
    position: 'absolute',
    backgroundColor: cssTheme.colors.gray[200], // Light gray background
    borderRadius: 12, // Rounded corners
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  languageOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  languageText: {
    fontSize: 16,
    color: '#111827',
    textTransform: 'uppercase',
  },
  optionIcon: {
    color: cssTheme.colors.primary[900],
  },
  languageTextActive: {
    color: cssTheme.colors.primary[900],
  },
});
}
