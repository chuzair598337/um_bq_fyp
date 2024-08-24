const BASE_URL = 'http://localhost:5000/api'; // Adjust this URL based on your server location

// Helper function to handle responses
async function handleResponse(response) {
    // Check if response is OK
    if (!response.ok) {
        // Handle error
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
    }

    // Check the Content-Type header to determine the type of response
    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.startsWith('audio/')) {
        // Handle audio blob response
        return response.blob();
    } else if (contentType && contentType === 'application/json') {
        // Handle JSON response
    return response.json();
    } else {
        // Handle other types of responses if needed
        throw new Error('Unexpected response type');
    }
}

// // Helper function to handle responses
// async function handleResponse(response) {
//     if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Something went wrong');
//     }
//     return response.json();
//}

// Fetch all Surahs
export async function fetchSurahs() {
    try {
        const response = await fetch(`${BASE_URL}/surahs`);
        return handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch Surahs:", error);
        throw error;
    }
}


// Fetch a single Surah by ID
export async function fetchSurahById(surahID) {
    try {
        const response = await fetch(`${BASE_URL}/surahs/${surahID}`);
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to fetch Surah with ID${surahID}:`, error);
        throw error;
    }
}

// Create a new Surah
export async function createSurah(surahData) {
    try {
        const response = await fetch(`${BASE_URL}/surahs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(surahData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error("Failed to create Surah:", error);
        throw error;
    }
}

// Update a Surah by ID
export async function updateSurah(surahID, surahData) {
    try {
        const response = await fetch(`${BASE_URL}/surahs/${surahID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(surahData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to update Surah with ID ${surahID}:`, error);
        throw error;
    }
}

// Delete a Surah by ID
export async function deleteSurah(surahID) {
    try {
        const response = await fetch(`${BASE_URL}/surahs/${surahID}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to delete Surah with ID ${surahID}:`, error);
        throw error;
    }
}

// Fetch audiofilesList for a specific Surah ID
export async function fetchAudioFilesList(surahID) {
    try {
        const response = await fetch(`${BASE_URL}/surahtilawataudios/${surahID}`);
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to fetch audio files List for Surah ID ${surahID}:`, error);
        throw error;
    }
}

// Fetch audio for a specific filename
export async function fetchAudioFile(filename) {
    try {
        const response = await fetch(`${BASE_URL}/surahtilawataudios/file/${filename}`);
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to fetch audio file ${filename}:`, error);
        throw error;
    }
}





// Fetch all QuranEPak entries
export async function fetchQuranEPak() {
    try {
        const response = await fetch(`${BASE_URL}/quranepak`);
        return handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch QuranEPak:", error);
        throw error;
    }
}
//fetchQuranEPak by surah ID 
// APIWrapper.js
export const fetchQuranEPakbySId = async (surahID) => {
    const response = await fetch(`${BASE_URL}/quran/${surahID}`);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
        return response.json();
    } else {
        const text = await response.text();
        throw new Error('Expected JSON, but received: ' + text);
    }
};


// Fetch a single QuranEPak entry by ID
export async function fetchQuranEPakById(quranEPakID) {
    try {
        const response = await fetch(`${BASE_URL}/quranepak/${quranEPakID}`);
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to fetch QuranEPak entry with ID ${quranEPakID}:`, error);
        throw error;
    }
}

// Create a new QuranEPak entry
export async function createQuranEPak(quranEPakData) {
    try {
        const response = await fetch(`${BASE_URL}/quranepak`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quranEPakData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error("Failed to create QuranEPak entry:", error);
        throw error;
    }
}

// Update a QuranEPak entry by ID
export async function updateQuranEPak(quranEPakID, quranEPakData) {
    try {
        const response = await fetch(`${BASE_URL}/quranepak/${quranEPakID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quranEPakData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to update QuranEPak entry with ID ${quranEPakID}:`, error);
        throw error;
    }
}

// Delete a QuranEPak entry by ID
export async function deleteQuranEPak(quranEPakID) {
    try {
        const response = await fetch(`${BASE_URL}/quranepak/${quranEPakID}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to delete QuranEPak entry with ID ${quranEPakID}:`, error);
        throw error;
    }
}

// Fetch all Bayans
export async function fetchBayans() {
    try {
        const response = await fetch(`${BASE_URL}/bayans`);
        return handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch Bayans:", error);
        throw error;
    }
}

// Fetch a single Bayan by ID
export async function fetchBayanById(bayanID) {
    try {
        const response = await fetch(`${BASE_URL}/bayans/${bayanID}`);
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to fetch Bayan with ID ${bayanID}:`, error);
        throw error;
    }
}

// Create a new Bayan
export async function createBayan(bayanData) {
    try {
        const response = await fetch(`${BASE_URL}/bayans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bayanData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error("Failed to create Bayan:", error);
        throw error;
    }
}

// Update a Bayan by ID
export async function updateBayan(bayanID, bayanData) {
    try {
        const response = await fetch(`${BASE_URL}/bayans/${bayanID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bayanData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to update Bayan with ID ${bayanID}:`, error);
        throw error;
    }
}

// Delete a Bayan by ID
export async function deleteBayan(bayanID) {
    try {
        const response = await fetch(`${BASE_URL}/bayans/${bayanID}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to delete Bayan with ID ${bayanID}:`, error);
        throw error;
    }
}

// Fetch all Bookmarks
export async function fetchBookmarks() {
    try {
        const response = await fetch(`${BASE_URL}/bookmarks`);
        return handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch Bookmarks:", error);
        throw error;
    }
}

// Fetch a single Bookmark by ID
export async function fetchBookmarkById(bookmarkID) {
    try {
        const response = await fetch(`${BASE_URL}/bookmarks/${bookmarkID}`);
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to fetch Bookmark with ID ${bookmarkID}:`, error);
        throw error;
    }
}

// Create a new Bookmark
export async function createBookmark(bookmarkData) {
    try {
        const response = await fetch(`${BASE_URL}/bookmarks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookmarkData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error("Failed to create Bookmark:", error);
        throw error;
    }
}

// Update a Bookmark by ID
export async function updateBookmark(bookmarkID, bookmarkData) {
    try {
        const response = await fetch(`${BASE_URL}/bookmarks/${bookmarkID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookmarkData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to update Bookmark with ID ${bookmarkID}:`, error);
        throw error;
    }
}

// Delete a Bookmark by ID
export async function deleteBookmark(bookmarkID) {
    try {
        const response = await fetch(`${BASE_URL}/bookmarks/${bookmarkID}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to delete Bookmark with ID ${bookmarkID}:`, error);
        throw error;
    }
}

// ------------------- Additional Routes -------------------

// Fetch all Chains
export async function fetchChains() {
    try {
        const response = await fetch(`${BASE_URL}/chains`);
        return handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch Chains:", error);
        throw error;
    }
}

// Fetch a single Chain by ID
export async function fetchChainById(chainID) {
    try {
        const response = await fetch(`${BASE_URL}/chains/${chainID}`);
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to fetch Chain with ID ${chainID}:`, error);
        throw error;
    }
}

// Create a new Chain
export async function createChain(chainData) {
    try {
        const response = await fetch(`${BASE_URL}/chains`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chainData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error("Failed to create Chain:", error);
        throw error;
    }
}

// Update a Chain by ID
export async function updateChain(chainID, chainData) {
    try {
        const response = await fetch(`${BASE_URL}/chains/${chainID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chainData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to update Chain with ID ${chainID}:`, error);
        throw error;
    }
}

// Delete a Chain by ID
export async function deleteChain(chainID) {
    try {
        const response = await fetch(`${BASE_URL}/chains/${chainID}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to delete Chain with ID ${chainID}:`, error);
        throw error;
    }
}

// Fetch all ChainDetails
export async function fetchChainDetails() {
    try {
        const response = await fetch(`${BASE_URL}/chaindetails`);
        return handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch ChainDetails:", error);
        throw error;
    }
}

// Fetch a single ChainDetail by ID
export async function fetchChainDetailById(chainDetailID) {
    try {
        const response = await fetch(`${BASE_URL}/chaindetails/${chainDetailID}`);
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to fetch ChainDetail with ID ${chainDetailID}:`, error);
        throw error;
    }
}

// Create a new ChainDetail
export async function createChainDetail(chainDetailData) {
    try {
        const response = await fetch(`${BASE_URL}/chaindetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chainDetailData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error("Failed to create ChainDetail:", error);
        throw error;
    }
}

// Update a ChainDetail by ID
export async function updateChainDetail(chainDetailID, chainDetailData) {
    try {
        const response = await fetch(`${BASE_URL}/chaindetails/${chainDetailID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chainDetailData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to update ChainDetail with ID ${chainDetailID}:`, error);
        throw error;
    }
}

// Delete a ChainDetail by ID
export async function deleteChainDetail(chainDetailID) {
    try {
        const response = await fetch(`${BASE_URL}/chaindetails/${chainDetailID}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`Failed to delete ChainDetail with ID ${chainDetailID}:`, error);
        throw error;
    }
}

